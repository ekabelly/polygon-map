import {useEffect, useState} from "react";

function Coordinates(props) {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');

    useEffect(() => {
        if (props.clickLocation) {
            const {lng, lat} = props.clickLocation;
            setLng(lng);
            setLat(lat);
        }
    }, [props.clickLocation])

    function emitCoordinates() {
        props.emitCoordinates({lat, lng});
        setLat('');
        setLng('');
    }

    return (<div className="coordinates">
        <h4>Coordinates Form</h4>
        <div className="flex-column">
            lat: <input value={lat} onInput={(event) => setLat(event.target.value)} type="number"/>
            lng: <input value={lng} onInput={(event) => setLng(event.target.value)} type="number"/>
        </div>
        <button onClick={emitCoordinates}>submit</button>
    </div>)
}

export default Coordinates;
