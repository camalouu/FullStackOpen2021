import patients from '../data/patients';
import { PublicPatient, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): PublicPatient[] => {
    return patients.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation
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

export default {
    getAllPatients,
    getById,
    addPatient
};