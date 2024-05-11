import { ethers } from "ethers"

export const generateNextHash = (from: string, nonce: number) => {
    return ethers.getCreateAddress({from, nonce});
}