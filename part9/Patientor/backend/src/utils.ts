/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseStringField = (fieldName: string, fieldValue: unknown): string => {
    if (!fieldValue || !isString(fieldValue)) {
        throw new Error(`${fieldName} is not string`);
    }
    return fieldValue;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Gender field is not correct: ' + gender);
    }
    return gender;
};

const patientParser = (obj: any): NewPatient => {
    const newPatient = {
        name: parseStringField('name', obj.name),
        dateOfBirth: parseDate(obj.dateOfBirth),
        ssn: parseStringField('ssn', obj.ssn),
        occupation: parseStringField('occupation', obj.occupation),
        gender: parseGender(obj.gender),
        entries: []
    };
    return newPatient;
};

export default patientParser;