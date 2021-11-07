import React from "react";
import {loadBingApi, Microsoft} from "../util/bing-map.util";
import colors from '../constants/colors.json';

export default class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mapElRef: React.createRef(),
            map: null,
            pins: [],
            polyLines: [],
            polygon: null
        }
    }

    componentDidMount() {
        this.initMap();
    }

    async initMap() {
        await loadBingApi(process.env.REACT_APP_BING_MAPS_KEY)

        this.state.map = this.setState({
            ...this.state,
            map: new Microsoft.Maps.Map(this.state.mapElRef.current)
        });
        Microsoft.Maps.Events.addHandler(this.state.map, 'click', e =>
            this.props.onMapClick({lat: e.location.latitude, lng: e.location.longitude}));
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {coordinates} = this.props;
        const prevCoordinates = prevProps.coordinates;
        if ((!prevCoordinates && coordinates) || (coordinates && coordinates.lat !== prevCoordinates.lat && coordinates.lng !== prevCoordinates.lng)) {
            this.setMapCoordinates()
        }
    }

    setMapCoordinates() {
        const {lat, lng} = this.props.coordinates;
        const location = {...this.state.map.getCenter(), latitude: lat, longitude: lng};
        let pin;
        const pins = [...this.state.pins];
        if (pins.length < 3) {
            pin = new Microsoft.Maps.Pushpin(location, {color: colors.red});
            pins.push(pin)
        } else {
            pin = pins.shift();
            this.state.map.entities.remove(pin);
            pin.setLocation(location);
            pins.push(pin);
        }
        this.setState({...this.state, pins: pins}, () => {
            console.log('asdsdqw')
            this.state.map.entities.push(pin);
            this.drawPolyLines(pins.length - 2);
        });
    }

    async drawPolyLines(startingPinIndex) {
        await this.handlePolyLinesLogic();
        // only draw a line if the startingPinIndex is 0 or bugger
        if (startingPinIndex >= 0) {
            this.drawPolyLine(this.state.pins[startingPinIndex], this.state.pins[startingPinIndex + 1]);
            // if startingPinIndex is equal to 1, this means a line was drawn between pin 1 (index) to pins 2.
            // in this case, we want to paint another line between pin 2 to pin 0
            if (startingPinIndex === 1) {
                this.drawPolyLine(this.state.pins[2], this.state.pins[0]);
                this.drawPolyGon();
            }
        }
    }

    handlePolyLinesLogic() {
        return new Promise(resolve => {
            // if there are already 3 polyLines,
            const {polyLines} = this.state;
            if (polyLines.length === 3) {
                // remove the first polyLine last one,
                // in order to only keep the line between the second pin and the third pin
                // since the first pin was removed
                this.state.map.entities.remove(polyLines[0]);
                this.state.map.entities.remove(polyLines[2]);
                // also reset this.polyLines and include only the polyline between the second and third pins
                this.setState({...this.state, polyLines: [polyLines[1]]}, () => {
                    console.log('resolve')
                    resolve();
                });
            } else {
                resolve();
            }
        });
    }

    drawPolyLine(pin1, pin2) {
        const polyline = new Microsoft.Maps.Polyline([
            this.pinToLocation(pin1),
            this.pinToLocation(pin2)
        ], {
            strokeColor: colors.strokeRed,
            strokeThickness: 3
        });
        const polyLines = [...this.state.polyLines];
        polyLines.push(polyline);
        this.setState({
            ...this.state,
            polyLines
        });
        this.state.map.entities.push(polyline);
    }

    drawPolyGon() {
        const polyGon = this.createPolyGon([
            ...this.state.pins.map(this.pinToLocation),
            this.pinToLocation(this.state.pins[0])
        ]);
        this.state.map.entities.push(polyGon);
    }

    createPolyGon(locations) {
        // reset polygon if already exists
        if (this.state.polygon) {
            this.state.map.entities.remove(this.state.polygon);
        }
        const polygon = new Microsoft.Maps.Polygon(locations, {
            fillColor: colors.polygonFillRed,
            strokeColor: colors.strokeRed,
            strokeThickness: 3
        });
        this.setState({
            ...this.state,
            polygon
        });
        return polygon;
    }

    pinToLocation(pin) {
        return new Microsoft.Maps.Location(pin.geometry.y, pin.geometry.x);
    }

    render() {
        return <div ref={this.state.mapElRef} className="map pointer"/>;
    }
}
