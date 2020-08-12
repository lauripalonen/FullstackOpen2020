import express from 'express';
const app = express();

import { bmiCalculator } from './bmiCalculator';
import { calculateExercises, Feedback } from './exerciseCalculator';

const PORT = 3003;

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if (!req.query.height || !req.query.weight) {
    res.send({
      error: "missing parameters"
    });
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "malformatted parameters"
    });
  }

  const bmi = bmiCalculator(height, weight);

  res.send({
    weight: weight,
    height: height,
    bmi: bmi
  });

});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as { daily_exercises: Array<number>, target: number };

  if (!daily_exercises || !target) {
    res.send({
      error: "parameters missing"
    });
  }

  const exercises = daily_exercises.map(e => Number(e));

  if (exercises.some(isNaN) || isNaN(target)) {
    res.send({
      error: "malformatted parameters"
    });
  }

  const calculation: Feedback = calculateExercises(exercises, target);

  res.json(calculation);

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});