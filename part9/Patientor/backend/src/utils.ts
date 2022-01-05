/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Diagnosis, EntryWithoutId, Gender, HealthCheckRating, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const parseStringField = (fieldName: string, fieldValue: unknown): string => {
    if (!fieldValue || !isString(fieldValue)) {
        throw new Error(`${fieldName} is not a string`);
    }
    return fieldValue;
};

const parseGender = (gender: unknown): Gender => {

    const isGender = (param: any): param is Gender => {
        return Object.values(Gender).includes(param);
    };

    if (!gender || !isGender(gender)) {
        throw new Error('Gender field is not correct: ' + gender);
    }
    return gender;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {

    const isRating = (param: any): param is HealthCheckRating => {
        return Object.values(HealthCheckRating).includes(param);
    };

    if (!rating || !isRating(rating)) {
        throw new Error('healthCheckRating field is not correct: ' + rating);
    }
    return rating;
};

const parseDiagnosisCodes = (codes: unknown): Array<Diagnosis['code']> | undefined => {
    if (codes && codes instanceof Array) {
        return codes.map(code => parseStringField('diagnosis code', code));
    }
    return undefined;
};

const missingProperty = (name: string) => {
    throw new Error("Property is missing: " + name);
};

export const patientParser = (obj: any): NewPatient => {
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

export const entryParser = (obj: any): EntryWithoutId => {

    const base = {
        description: parseStringField('Entry description', obj.description),
        specialist: parseStringField('Entry specialist', obj.specialist),
        date: parseDate(obj.date),
        diagnosisCodes: parseDiagnosisCodes(obj.diagnosisCodes),
    };

    switch (obj.type) {
        case "Hospital":
            if (!obj.discharge) {
                missingProperty("discharge");
            }
            return {
                ...base,
                type: "Hospital",
                discharge: {
                    date: parseDate(obj.discharge.date),
                    criteria: parseStringField('discharge criteria', obj.discharge.criteria),
                }
            };
        case "HealthCheck":
            if (!obj.healthCheckRating) {
                missingProperty("healthCheckRating");
            }
            return {
                ...base,
                type: "HealthCheck",
                healthCheckRating: parseHealthCheckRating(obj.healthCheckRating),
            };
        case "OccupationalHealthcare":
            if (!obj.employerName) {
                missingProperty("employerName");
            }
            return {
                ...base,
                type: "OccupationalHealthcare",
                employerName: parseStringField("employerName", obj.employerName),
                sickLeave: obj.sickLeave ?
                    {
                        startDate: parseDate(obj.sickLeave.startDate),
                        endDate: parseDate(obj.sickLeave.endDate),
                    }
                    : undefined
            };
        default:
            throw new Error("blabla objecttypee error");
    }
};
