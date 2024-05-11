import config from "./config";
import { generateNextHash, generateRandomIntegerNumbers, loadDataFromJson, saveDataToJson } from "./utils";

const main = () => {
    let from = config.initFrom;
    let count = config.count;
    const randNumbers = generateRandomIntegerNumbers(1, 10000000, count);
    let hashes = new Array<{hash: string, nonce: number | undefined}>();
    for (let i = 0; i < randNumbers.length; i++) {
        const nonce = randNumbers[i];
        hashes.push({
            hash: from,
            nonce: nonce
        })
        from = generateNextHash(from, nonce);
    }
    hashes.push({
        hash: from,
        nonce: undefined
    })
    saveDataToJson('out.json', hashes);
    console.info(loadDataFromJson('out.json'))
}

main();