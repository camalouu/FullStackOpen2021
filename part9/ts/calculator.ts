const printToConsole = (input: string | number): void => {
    console.log(input);
}

type Operation = '-' | '+' | '*' | '/';

const calculate = (
    a: number,
    b: number,
    operation: Operation
): number | string => {
    switch (operation) {
        case '-':
            return a - b;
        case '+':
            return a + b;
        case '*':
            return a * b;
        case '/':
            if (b == 0) return 'division by zero';
            return a / b;
    }
}

const [a, b] = process.argv.slice(2)

const answer: string | number = calculate(
    Number(a), Number(b), '/'
)

printToConsole(answer)