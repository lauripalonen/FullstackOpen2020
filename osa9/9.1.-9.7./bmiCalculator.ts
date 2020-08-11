const calculateBmi = (height: number, weight: number): string => {
  const heightSquered = (height / 100) ^ 2
  const result = weight / heightSquered

  console.log('BMI is: ', result)

  switch (true) {
    case (result < 15):
      return 'Very severely underweight'
    case (result < 16):
      return 'Severely underweight'
    case (result < 18.5):
      return 'Underweight'
    case (result < 25):
      return 'Normal (healthy weight)'
    case (result < 30):
      return 'Overweight'
    case (result < 35):
      return 'Obese Class I (Moderately obese)'
    case (result < 40):
      return 'Obese Class II (Severely obese)'
    case (result > 40):
      return 'Obese Class III (Very severely'
  }
}

console.log(calculateBmi(180, 74))