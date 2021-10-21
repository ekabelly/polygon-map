import {useEffect, useState} from "react";
import MarkersFormTypeSelection from "./markers-form-type-selection";
import FormTypes from '../constants/form-types.json';
import LocationInput from "./location-input";

function MarkersForm(props) {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [formType, setFormType] = useState(FormTypes.coordinates);

    useEffect(() => {
        if (props.clickLocation) {
            const {clickLocation} = props;
            setLng(clickLocation.lng);
            setLat(clickLocation.lat);
            if (formType === FormTypes.onClick) {
                emitCoordinates(clickLocation);
            }
        }
    }, [props.clickLocation])

    function emitCoordinates(coordinates) {
        props.emitCoordinates(coordinates);
        setLat('');
        setLng('');
    }

    function renderSelectedFormType() {
        if (formType === FormTypes.coordinates) {
            return (<div className="flex-column">
                {/* using 2 way binding on the inputs to allow changing the value from parent (by clicking the map, for example) */}
                lat: <input value={lat} onInput={(event) => setLat(event.target.value)} type="number"/>
                lng: <input value={lng} onInput={(event) => setLng(event.target.value)} type="number"/>
            </div>)
        } else if (formType === FormTypes.onClick) {
            return '';
        } else if (formType === FormTypes.location) {
            return  <LocationInput emitCoordinates={emitCoordinates}></LocationInput>;
        }
    }

    return (<div className="coordinates">
        <h4>Markers Form</h4>
        <MarkersFormTypeSelection setFormType={setFormType}></MarkersFormTypeSelection>
        {renderSelectedFormType()}
        {formType === FormTypes.coordinates ? <button onClick={() => emitCoordinates({lat, lng})}>submit</button> : ''}
    </div>)
}

export default MarkersForm;
