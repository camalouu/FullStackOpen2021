interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: Array<number>): Result => {
    const target = hours[0];
    const periodLength = hours.length - 1;
    const trainingDays = hours.filter(h => h !== 0).length - 1;
    const average = (hours.reduce((a, b) => a + b) - target) / periodLength;
    const success = average >= target;
    const rating = average < 1 ? 1 : average < 2 ? 2 : 3;
    const ratingDescription = rating === 1 ? "Bad" : rating === 2 ? 'Good' : 'Perfect!';

    return { periodLength, trainingDays, success, rating, ratingDescription, target, average }
}

const parseArguments = (args: Array<string>): Array<number> => {
    if (args.length < 2)
        throw new Error('Not enough arguments');
    const numberArray = args.map(n => Number(n));
    if (numberArray.every(n => !isNaN(n)))
        return numberArray;
    else
        throw new Error('Provided values are not numbers');
}

try {
    const inputArray = process.argv.slice(2)
    console.log(
        calculateExercises(
            parseArguments(inputArray)
        )
    )
} catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
        errorMessage += ' \nError: ' + error.message;
    }
    console.log(errorMessage);
}