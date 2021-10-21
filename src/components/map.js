import React from "react";
import {loadBingApi, Microsoft} from "../util/bing-map.util";

export default class Map extends React.Component {
    mapElRef = React.createRef();
    map;
    pins = [];

    componentDidMount() {
        loadBingApi(process.env.REACT_APP_BING_MAPS_KEY).then(() => {
            this.initMap();
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.coordinates) {
            this.setMapCoordinates()
        }
    }

    setMapCoordinates() {
        const {lat, lng} = this.props.coordinates;
        const location = {...this.map.getCenter(), latitude: lat, longitude: lng};
        let pin;
        if (this.pins.length < 3) {
            pin = new Microsoft.Maps.Pushpin(location);
            this.pins.push(pin)
        } else {
            pin = this.pins.shift();
            this.map.entities.remove(pin);
            pin.setLocation(location);
        }
        this.map.entities.push(pin);
    }

    initMap() {
        this.map = new Microsoft.Maps.Map(this.mapElRef.current);
        Microsoft.Maps.Events.addHandler(this.map, 'click', e =>
            this.props.onMapClick({latitude: e.location.latitude, longitude: e.location.longitude}));
    }

    render() {
        return <div ref={this.mapElRef} className="map"/>;
    }
}
