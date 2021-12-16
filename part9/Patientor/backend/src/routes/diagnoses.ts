import { Router } from "express";
import diagnoseService from "../services/diagnosesService";

const route = Router();

route.get('/', (_req, res) => {
    res.send(diagnoseService.getAllDiagnoses());
});

export default route;