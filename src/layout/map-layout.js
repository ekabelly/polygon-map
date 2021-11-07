import '../assets/style/map-layout.scss';
import MarkersForm from "../components/markers-form";
import Map from "../components/map";
import {useState} from "react";

function MapLayout() {
    const [coordinates, setCoordinates] = useState();
    const [clickLocation, setClickLocation] = useState();

    function clickLocationRenderer() {
        if (clickLocation) {
            return (<div className='flex space-between'>
                you clicked on:
                <div>lng: {clickLocation.lng}</div>
                <div>lat: {clickLocation.lat}</div>
            </div>)
        }
        return '';
    }

    return (
        <div className="map-layout">
            <header>
                <h1>Polygon Map!</h1>
                <div className='clicked-on'>
                    {clickLocationRenderer()}
                </div>
            </header>
            <div className="content flex">
                <MarkersForm emitCoordinates={setCoordinates} clickLocation={clickLocation}></MarkersForm>
                <Map onMapClick={setClickLocation} coordinates={coordinates}></Map>
            </div>
        </div>
    );
}

export default MapLayout;
