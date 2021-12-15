/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello FullStack!');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if (isNaN(height) || isNaN(weight))
        res.json({ error: "malformatted parameters" });

    res.json({
        height,
        weight,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
    try {
        const { daily_exercises, target } = req.body;

        if (!(daily_exercises && target)) {
            return res.status(400).json({ error: "parameters missing" });
        }

        if (!(daily_exercises instanceof Array) || (typeof target !== 'number')) {
            return res.status(400).json({ error: "malformatted parameters" });
        }

        const result = calculateExercises(target, daily_exercises);

        return res.json(result);

    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});