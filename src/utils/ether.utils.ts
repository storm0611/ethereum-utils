import { ethers } from "ethers"

export const generateNextHash = (from: string, nonce: number) => {
    return ethers.utils.solidityKeccak256([ "bytes32", "uint256" ], [from, nonce]);
}

export const generateNextHashes = (from: string, nonces: Array<number>) => {
    const types = [];
    const args = [];
    types.push("string");
    args.push(from)
    for (let i = 0; i < nonces.length; i++) {
        types.push("uint256");
        args.push(nonces[i]);
    }
    return ethers.utils.solidityKeccak256(types, args);
}

export const verify = (hash: string, nonces: Array<number>, nextHash: string) => {
    return generateNextHashes(hash, nonces) == nextHash
}