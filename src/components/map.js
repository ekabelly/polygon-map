import React from "react";
import {loadBingApi, Microsoft} from "../util/bing-map.util";

export default class Map extends React.Component {
    mapElRef = React.createRef();
    map;
    pins = [];
    polyLines = [];
    polygon;

    componentDidMount() {
        this.initMap();
    }

    async initMap() {
        await loadBingApi(process.env.REACT_APP_BING_MAPS_KEY)

        this.map = new Microsoft.Maps.Map(this.mapElRef.current);
        Microsoft.Maps.Events.addHandler(this.map, 'click', e =>
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
        const location = {...this.map.getCenter(), latitude: lat, longitude: lng};
        let pin;
        if (this.pins.length < 3) {
            pin = new Microsoft.Maps.Pushpin(location, {color: 'red'});
            this.pins.push(pin)
        } else {
            pin = this.pins.shift();
            this.map.entities.remove(pin);
            pin.setLocation(location);
            this.pins.push(pin);
        }
        this.map.entities.push(pin);
        this.drawPolyLines(this.pins.length - 2);
    }

    drawPolyLines(startingPinIndex) {
        this.handlePolyLinesLogic();
        // only draw a line if the startingPinIndex is 0 or bugger
        if (startingPinIndex >= 0) {
            this.drawPolyLine(this.pins[startingPinIndex], this.pins[startingPinIndex + 1]);
            // if startingPinIndex is equal to 1, this means a line was drawn between pin 1 (index) to pins 2.
            // in this case, we want to paint another line between pin 2 to pin 0
            if (startingPinIndex === 1) {
                this.drawPolyLine(this.pins[2], this.pins[0]);
                this.drawPolyGon();
            }
        }
    }

    handlePolyLinesLogic() {
        // if there are already 3 polyLines,
        if (this.polyLines.length === 3) {
            // remove the first polyLine last one,
            // in order to only keep the line between the second pin and the third pin
            // since the first pin was removed
            this.map.entities.remove(this.polyLines[0]);
            this.map.entities.remove(this.polyLines[2]);
            // also reset this.polyLines and include only the polyline between the second and third pins
            this.polyLines = [this.polyLines[1]];
        }
    }

    drawPolyLine(pin1, pin2) {
        const polyline = new Microsoft.Maps.Polyline([
            this.pinToLocation(pin1),
            this.pinToLocation(pin2)
        ], {
            strokeColor: 'red',
            strokeThickness: 3
        });
        this.polyLines.push(polyline);
        this.map.entities.push(polyline);
    }

    drawPolyGon() {
        const polyGon = this.createPolyGon([
            ...this.pins.map(this.pinToLocation),
            this.pinToLocation(this.pins[0])
        ]);
        this.map.entities.push(polyGon);
    }

    createPolyGon(locations) {
        // reset polygon if already exists
        if (this.polygon) {
            this.map.entities.remove(this.polygon)
        }
        this.polygon = new Microsoft.Maps.Polygon(locations, {
            fillColor: 'rgb(159, 0, 0,.3)',
            strokeColor: 'rgb(165, 0, 0)',
            strokeThickness: 3
        });
        return this.polygon;
    }

    pinToLocation(pin) {
        return new Microsoft.Maps.Location(pin.geometry.y, pin.geometry.x);
    }

    render() {
        return <div ref={this.mapElRef} className="map"/>;
    }
}
