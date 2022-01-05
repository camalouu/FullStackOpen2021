import patients from '../data/patients';
import { PublicPatient, NewPatient, Patient, Entry, EntryWithoutId } from '../types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): PublicPatient[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
};

const getById = (id: string): Patient | undefined => {
    const patient = patients.find(p => p.id === id);
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const id = uuid();
    const newPatient = { ...patient, id };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (entry: EntryWithoutId, patientId: string): Entry => {
    const id = uuid();
    const newEntry = { ...entry, id };
    patients.forEach(p => {
        if (p.id === patientId)
            p.entries.push(newEntry);
    });
    return newEntry;
};

export default {
    getAllPatients,
    getById,
    addPatient,
    addEntry
};