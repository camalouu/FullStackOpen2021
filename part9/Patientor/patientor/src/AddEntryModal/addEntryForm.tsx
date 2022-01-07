import React, { useState } from "react";
import { Dropdown, DropdownProps, FormField } from "semantic-ui-react";
import HealthCheckForm from "./HealthCheckForm";
import HospitalForm from "./HospitalForm";
import OccupationalHealthCareForm from "./OccupationalHealthCareForm";
import { EntriesWithoutId } from "../types";

interface FormProps {
    onSubmit: (values: EntriesWithoutId) => void;
    onCancel: () => void
}

const options = [
    { value: "HealthCheckEntry", text: "Health check" },
    { value: "HospitalEntry", text: "Hospital" },
    { value: "OccupationalHealthcareEntry", text: "Occupational health care" }
];

const EntryForm = ({ onSubmit, onCancel }: FormProps) => {
    const [form, setForm] = useState("HealthCheckEntry");
    const props = { onSubmit, onCancel };
    const onChange = (
       
        data: DropdownProps
    ) => {
        setForm(data.value as string);
    };
    return (
        <>
            <FormField>
                <label>Select the type of entry: </label>
                <Dropdown
                    placeholder='Select type'
                    fluid
                    selection
                    options={options}
                    onChange={onChange}
                    defaultValue={form}
                />
            </FormField>
            {
                form === "HealthCheckEntry" ?
                <HealthCheckForm {...props} /> 
                : form === "HospitalEntry" ?
                <HospitalForm {...props} /> 
                :
                <OccupationalHealthCareForm {...props} />
            }
        </>

    );
};

export default EntryForm;