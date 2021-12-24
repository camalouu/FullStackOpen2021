import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "UPDATE_PATIENT";
    payload: Patient;
  }
  | {
    type: "GET_DIAGNOSIS";
    payload: Diagnosis;
  };

export const getDiagnosis = (diagnosis: Diagnosis)
  : Action => {
  return {
    type: "GET_DIAGNOSIS",
    payload: diagnosis
  };
};

export const setPatientList = (patientListFromApi: Patient[])
  : Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  };
};

export const addPatient = (newPatient: Patient)
  : Action => {
  return {
    type: "ADD_PATIENT",
    payload: newPatient
  };
};

export const updatePatient = (patient: Patient)
  : Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "GET_DIAGNOSIS":
      return {
        ...state,
        diagnosis: {
          ...state.diagnosis,
          [action.payload.code]: action.payload
        }
      };
    default:
      return state;
  }
};
