interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculateExercises = (target: number, hours: Array<number>): Result => {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h !== 0).length;
    const average = hours.reduce((a, b) => a + b) / periodLength;
    const success = average >= target;
    const rating = average < target * 0.5 ? 1 : average < target ? 2 : 3;
    const ratingDescription = rating === 1 ? "Bad" : rating === 2 ? 'Good' : 'Perfect!';
    return { periodLength, trainingDays, success, rating, ratingDescription, target, average };
};

const parseArguments = (args: Array<string>): Array<number> => {
    if (args.length < 1)
        throw new Error('Not enough arguments');
    const numberArray = args.map(n => Number(n));
    if (numberArray.every(n => !isNaN(n)))
        return numberArray;
    else
        throw new Error('Provided values are not numbers');
};

try {
    const [target, ...inputArray] = process.argv.slice(2);
    console.log(
        calculateExercises(Number(target), parseArguments(inputArray))
    );
} catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' \nError: ' + error.message;
    }
    console.log(errorMessage);
}