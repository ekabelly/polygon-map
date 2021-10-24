import {useCallback, useState} from "react";
import {debounce} from 'lodash';
import {autoComplete} from "../services/location.service";

export default function LocationInput({emitCoordinates}) {
    const [selectedLocationName, setSelectedLocationName] = useState();
    const [locations, setLocations] = useState([]);

    // debouncing the user's input, wrapping startAutoComplete with debounce.
    const debouncedStartAutoComplete = useCallback(debounce(startAutoComplete, 300), []);

    function onInput(currentValue) {
        // as soon as the user types anything,
        // set its value to the input's value to reflect the typing
        setSelectedLocationName(currentValue);
        debouncedStartAutoComplete(currentValue);
    }

    async function startAutoComplete(currentValue) {
        const locationsRes = await autoComplete(currentValue);
        setLocations(locationsRes || []);
    }

    // emit the location data and reset locations state
    function emitLocation(location) {
        // set the inputs value to the selected location
        setSelectedLocationName(location.name);
        emitCoordinates({lat: location.lat, lng: location.lng});
        setLocations([]);
    }

    function renderLocation(location, index) {
        return (<div key={location.name + index} className="pointer" onClick={() => emitLocation(location)}>
            {location.name}
        </div>)
    }

    return (<div>
        <input type="text" value={selectedLocationName} onInput={e => onInput(e.target.value)}/>
        {locations.map(renderLocation)}
    </div>)
}
