import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    useEffect(() => {
        if (!patients[id].ssn) {
            void axios
                .get<Patient>(`${apiBaseUrl}/patients/${id}`)
                .then(
                    ({ data }) => dispatch(updatePatient(data))
                );
        }
    }, []);
    return (
        <>
            <h2>
                {patients[id].name} {patients[id].gender == "female" ? <Icon name="venus" /> : <Icon name="mars" />}
            </h2>
            <p>ssn: {patients[id].ssn}</p>
            <p>occupation: {patients[id].occupation}</p>
        </>
    );
};

export default PatientInfo;