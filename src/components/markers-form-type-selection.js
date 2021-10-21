import FormTypes from '../constants/form-types.json';
import {useState} from "react";

export default function MarkersFormTypeSelection({setFormType}) {
    const [selectedFormType, setSelectedFormTypeState] = useState(FormTypes.coordinates);

    function setSelectedFormType(formType) {
        setSelectedFormTypeState(formType);
        setFormType(formType);
    }

    return (<div className="flex-column">
        {Object.keys(FormTypes).map(formType => <label htmlFor={formType} className="pointer">
            <input
                id={formType}
                checked={selectedFormType === formType}
                type="radio"
                name="markers-form-type"
                onClick={() => setSelectedFormType(formType)}
            />
            {formType}
        </label>)}
    </div>)
}
