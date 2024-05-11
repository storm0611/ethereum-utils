export const generateRandomIntegerNumbers = (min: number, max: number, count: number) => {
    const randNumbers = new Array<number>();
    for (let i = 0; i < count; i++) {
        randNumbers.push(Math.floor(min + Math.random() * (max - min)));
    }
    return randNumbers;
}