import { Router } from "express";
import diagnoseService from "../services/diagnosesService";

const route = Router();

route.get('/', (_req, res) => {
    res.send(diagnoseService.getAllDiagnoses());
});

route.get('/:code', (req, res) => {
    const diagnose = diagnoseService.getByCode(req.params.code);
    if (diagnose)
        res.send(diagnose);
    else
        res.sendStatus(404);
});

export default route;