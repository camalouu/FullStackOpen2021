import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePatient, useStateValue } from "../state";
import { Patient, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { Button, Icon } from "semantic-ui-react";
import EntryDetails from "./Entry";
import AddEntryModal from "../AddEntryModal";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
    };

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

    const submitNewEntry = (values: Omit<HealthCheckEntry, 'id'>) => {
        void axios
            .post<HealthCheckEntry>(`${apiBaseUrl}/patients/${id}/entries`, values);
    };

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
                        <EntryDetails entry={entry} />
                    </div>
                ))
            }
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                onClose={() => closeModal()}
            />
            <Button onClick={() => openModal()}>add new entry</Button>

        </>
    );
};

export default PatientInfo;