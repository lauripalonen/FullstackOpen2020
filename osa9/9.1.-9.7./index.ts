import express from 'express';
const app = express();

import { bmiCalculator } from './bmiCalculator';

const PORT = 3003;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if (!req.query.height || !req.query.weight) {
    res.send({
      error: "missing parameters"
    })
  }

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.send({
      error: "malformatted parameters"
    })
  }

  const bmi = bmiCalculator(height, weight);

  res.send({
    weight: weight,
    height: height,
    bmi: bmi
  });

});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});