import patients from '../data/patients';
import { PatientWithoutSSN, NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getAllPatients = (): PatientWithoutSSN[] => {
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

const getById = (id: string): PatientWithoutSSN | undefined => {
    return patients.find(p => p.id === id);
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