import parseArguments from './argParser'

interface Feedback {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface Rating {
  value: number,
  description: string
}

const ratingCalculator = (difference: number): Rating => {
  switch (true) {
    case (difference <= 0):
      return { value: 3, description: "Good job!!" };
    case (difference <= 1):
      return { value: 2, description: "Ok!" };
    case (difference > 1):
      return { value: 1, description: "You can do better!" }
    default:
      throw new Error('Encountered an unexpected error')
  }
}

const calculateExercises = (exercises: Array<number>, target: number): Feedback => {

  const dayReducer = (trainingDays: number, trainingHours: number): number => {
    if (trainingHours > 0) {
      return trainingDays + 1;
    }
    return trainingDays;
  }

  const periodLength = exercises.length;
  const trainingDays = exercises.reduce(dayReducer, 0);
  const average = exercises.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const difference = target - average;
  const rating = ratingCalculator(difference);

  return {
    periodLength: periodLength,
    trainingDays: trainingDays,
    success: success,
    rating: rating.value,
    ratingDescription: rating.description,
    target: target,
    average: average
  }
}

try {
  const value = parseArguments(process.argv)
  console.log(calculateExercises(value.trainingHours, value.target))
} catch (e) {
  console.log('Error: ', e.message)
}