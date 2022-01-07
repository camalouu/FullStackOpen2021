import { State } from "./state";
import { Diagnosis, Entry, Patient } from "../types";

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
    type: "ADD_PATIENT_ENTRY";
    payload: { entry: Entry, patientId: string };
  }
  | {
    type: "GET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "GET_DIAGNOSIS";
    payload: Diagnosis;
  };

export const addPatientEntry = (patientId: string, entry: Entry)
  : Action => {
  return {
    type: "ADD_PATIENT_ENTRY",
    payload: { entry, patientId }
  };
};

export const getDiagnosisList = (diagnosis: Diagnosis[])
  : Action => {
  return {
    type: "GET_DIAGNOSIS_LIST",
    payload: diagnosis
  };
};

export const getSingleDiagnosis = (diagnosis: Diagnosis)
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
    case "ADD_PATIENT_ENTRY":
      const patientId = action.payload.patientId;
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            entries: [...state.patients[patientId].entries, action.payload.entry]
          }
        }
      };
    case "GET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...state.diagnosis,
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
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
