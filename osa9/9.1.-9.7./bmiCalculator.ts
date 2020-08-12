import parseArguments from './argParser';

const bmiCalculator = (height: number, weight: number): string => {

  const heightSquared = (height / 100) ^ 2;
  const result = weight / heightSquared;

  switch (true) {
    case (result < 15):
      return 'Very severely underweight';
    case (result < 16):
      return 'Severely underweight';
    case (result < 18.5):
      return 'Underweight';
    case (result < 25):
      return 'Normal (healthy weight)';
    case (result < 30):
      return 'Overweight';
    case (result < 35):
      return 'Obese Class I (Moderately obese)';
    case (result < 40):
      return 'Obese Class II (Severely obese)';
    case (result > 40):
      return 'Obese Class III (Very severely';
    default:
      throw new Error('Encountered an unexpected error');
  }
};

try {
  const values = parseArguments(process.argv);
  console.log(bmiCalculator(values.height, values.weight));
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error: ', e.message);
}

export { bmiCalculator };