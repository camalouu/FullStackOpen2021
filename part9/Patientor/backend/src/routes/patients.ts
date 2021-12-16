import { Router } from "express";
import patientService from "../services/patientService";

const route = Router();

route.get('/', (_req, res) => {
    res.send(patientService.getAllPatients());
});

export default route;