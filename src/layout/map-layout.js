import '../assets/style/map-layout.scss';
import Coordinates from "../components/coordinates";
import Map from "../components/map";
import {useState} from "react";

function MapLayout() {
    const [coordinates, setCoordinates] = useState();
    const [clickLocation, setClickLocation] = useState();

    function clickLocationRenderer() {
        if (clickLocation) {
            return (<div className='flex'>
                you clicked on:
                <div>lng: {clickLocation.longitude}</div>
                <div>lat: {clickLocation.latitude}</div>
            </div>)
        }
        return '';
    }

    return (
        <div className="map-layout">
            <header>
                <h1>Polygon Map!</h1>
                {clickLocationRenderer()}
            </header>
            <div className="content flex">
                <Coordinates emitCoordinates={setCoordinates}></Coordinates>
                <Map onMapClick={setClickLocation} coordinates={coordinates}></Map>
            </div>
        </div>
    );
}

export default MapLayout;
