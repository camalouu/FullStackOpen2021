import diagnoses from '../data/diagnoses';
import { Diagnose } from '../types';

const getAllDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

const getByCode = (code: string): Diagnose | undefined => {
    return diagnoses.find(d => d.code === code);
};

export default {
    getAllDiagnoses,
    getByCode
};