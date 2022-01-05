import express from 'express';
import diagnosesRoute from './routes/diagnoses';
import patientsRoute from './routes/patients';
import pingRoute from './routes/ping';
import cors from 'cors';

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());
app.use('/api/ping', pingRoute);
app.use('/api/diagnosis', diagnosesRoute);
app.use('/api/patients', patientsRoute);

export default app;
