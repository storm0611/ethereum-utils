import config from "./config";
import { generateNextHash, generateNextHashes, generateRandomIntegerNumbers, loadDataFromJson, saveDataToJson, verify } from "./utils";

const main = () => {
    const {min, max} = config;
    let from = config.initFrom;
    let count = config.count;
    const randNumbers = generateRandomIntegerNumbers(min, max, count);
    const hashes = [];
    for (let i = 0; i < randNumbers.length; i++) {
        const nonces = randNumbers.slice(i, i + 5);
        hashes.push({
            hash: from,
            nonces: nonces
        })
        from = generateNextHashes(from, nonces);
    }
    hashes.push({
        hash: from,
        nonce: undefined
    })
    saveDataToJson('out.json', hashes);
    console.info(loadDataFromJson('out.json'))
}

// main();
console.log(verify("0xf3e1230803372f3c957dc39d80a2977c9bd1fe9e4a4f8ece4a2c7a51a88c87ab", [ 45257, 23383, 55961, 85383, 79652 ], "0x5e4dc01ee91cfcb15411759234f37744a853e8ff3b98fa29cf76c001f4f6401d"))