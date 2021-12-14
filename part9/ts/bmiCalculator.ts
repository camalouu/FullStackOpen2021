const calculateBmi = (height: number, weight: number): string => {
    const heightInMeters = height / 100;
    const answer = weight / heightInMeters / heightInMeters;

    if (answer < 16) return 'Underweight (Severe thinness)';
    else if (16 <= answer && answer < 17) return 'Underweight (Moderate thinness)'
    else if (17 <= answer && answer < 18.5) return 'Underweight (Mild thinness)'
    else if (18.5 <= answer && answer < 25) return 'Normal range'
    else if (25 <= answer && answer < 30) return 'Overweight (Pre-obese)'
    else if (30 <= answer && answer < 35) return 'Obese (Class I)'
    else if (35 <= answer && answer < 40) return 'Obese (Class II)'
    else return 'Obese (Class III)'
}

const [height, weight] = process.argv.slice(2)

console.log(
    calculateBmi(Number(height), Number(weight))
)

export default calculateBmi