import { Router } from "express";
const route = Router();

route.get('/', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

export default route;