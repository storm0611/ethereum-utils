import { ethers } from "ethers"

export const generateNextHash = (from: string, nonce: number) => {
    return ethers.utils.solidityKeccak256([ "bytes32", "uint256" ], [from, nonce]);
}