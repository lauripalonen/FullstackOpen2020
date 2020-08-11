interface returnValues {
  height: number;
  weight: number;
  trainingHours: number[];
  target: number;
}

const parseArguments = (args: Array<string>): returnValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args[1].endsWith('bmiCalculator.ts')) {
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3]),
        trainingHours: null,
        target: null
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

  if (args[1].endsWith('exerciseCalculator.ts')) {
    if (args.length > 14) throw new Error('Too many arguments');
    const target = Number(args[2]);
    const trainingHours = args.slice(3).map(h => Number(h));

    if (!trainingHours.some(isNaN) && !isNaN(target)) {
      return {
        trainingHours: trainingHours,
        target: target,
        height: null,
        weight: null
      };
    } else {
      throw new Error('Provided values contained non-numeric characters!');
    }

  }
}

export default parseArguments;