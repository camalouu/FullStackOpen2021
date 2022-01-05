import { Router } from "express";
import patientService from "../services/patientService";
import { patientParser, entryParser } from "../utils";

const route = Router();

route.get('/', (_req, res) => {
    res.send(patientService.getAllPatients());
});

route.get('/:id', (req, res) => {
    const patient = patientService.getById(req.params.id);
    if (patient)
        res.send(patient);
    else
        res.sendStatus(404);
});

route.post('/', (req, res) => {
    try {
        const newPatient = patientParser(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.send(addedPatient);
    } catch (error) {
        let errorMessage = 'Something bad happened: \n';

        if (error instanceof Error) {
            errorMessage = error.message;
        }

        res.status(400).send({ error: errorMessage });
    }
});

route.post('/:id/entries', (req, res) => {
    try {
        const parsedEntry = entryParser(req.body);
        const updatedPatient = patientService.addEntry(parsedEntry, req.params.id);
        res.send(updatedPatient);
    } catch (error) {
        let errorMessage = 'Something bad happened: \n';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        res.status(400).send({ error: errorMessage });
    }
});

export default route;