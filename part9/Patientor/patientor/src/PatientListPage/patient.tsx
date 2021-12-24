import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePatient, getDiagnosis, useStateValue } from "../state";
import { Diagnosis, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { Icon } from "semantic-ui-react";


const DiagnosisComponent = ({ code }: { code: string }) => {
    const [{ diagnosis }, dispatch] = useStateValue();

    useEffect(() => {
        if (!diagnosis[code])
            void axios
                .get<Diagnosis>(`${apiBaseUrl}/diagnosis/${code}`)
                .then(
                    ({ data }) => dispatch(getDiagnosis(data))
                );
    }, []);

    if (!diagnosis[code])
        return <h1>loading...</h1>;

    return (
        <li>
            {code} {diagnosis[code].name}
        </li>
    );
};

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();

    const noPatientData =
        patients[id] === undefined ||
        patients[id].entries === undefined;

    useEffect(() => {
        if (noPatientData)
            void axios
                .get<Patient>(`${apiBaseUrl}/patients/${id}`)
                .then(
                    ({ data }) => dispatch(updatePatient(data))
                );
    }, []);

    if (noPatientData)
        return (<h1>Loading...</h1>);

    return (
        <>
            <h2>
                {patients[id].name}
                {patients[id].gender == "female" ? <Icon name="venus" /> : <Icon name="mars" />}
            </h2>
            <p>ssn: {patients[id].ssn}</p>
            <p>occupation: {patients[id].occupation}</p>
            <h3>entries</h3>
            {
                patients[id].entries.map(entry => (
                    <div key={entry.id}>
                        <div>{entry.date} </div>
                        <em>{entry.description}</em>
                        <ul>
                            {entry.diagnosisCodes?.map(code => <DiagnosisComponent code={code} key={code} />)}
                        </ul>
                    </div>
                ))
            }
        </>
    );
};

export default PatientInfo;