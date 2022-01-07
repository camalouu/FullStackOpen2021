import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { addPatientEntry, updatePatient, useStateValue } from "../state";
import { Patient, EntriesWithoutId, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import { Button, Icon } from "semantic-ui-react";
import EntryDetails from "./Entry";
import AddEntryModal from "../AddEntryModal";

const PatientInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [{ patients }, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();

    const openModal = (): void => setModalOpen(true);
    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
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

    const submitNewEntry = (values: EntriesWithoutId) => {
        void axios
            .post<Entry>(`${apiBaseUrl}/patients/${id}/entries`, values)
            .then(({ data }) => {
                dispatch(addPatientEntry(id, data));
                closeModal();
            })
            .catch(
                (error: unknown) => {
                    let errorMessage = 'Something went wrong.';
                    if (axios.isAxiosError(error) && error.response) {
                        console.error(error.response.data);
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        errorMessage = error.response.data.error;
                    }
                    setError(errorMessage);
                }
            );

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
                error={error}
            />
            <Button onClick={() => openModal()}>add new entry</Button>
        </>
    );
};

export default PatientInfo;