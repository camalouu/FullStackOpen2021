/* eslint-disable @typescript-eslint/no-unsafe-return */
import diagnoses from '../data/diagnoses';
import { Diagnosis } from '../types';

const getAllDiagnoses = (): Array<Diagnosis> => {
    return diagnoses;
};

const getByCode = (code: string): Diagnosis | undefined => {
    return diagnoses.find(d => d.code === code);
};

export default {
    getAllDiagnoses,
    getByCode
};