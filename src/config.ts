import { ethers } from 'ethers';
import { load } from 'ts-dotenv';
import { parse } from "ts-command-line-args";

interface IArguments {
    from: string;
    count: number;
    min: number;
    max: number;
}

const args = parse<IArguments>({
    from: {
        type: String,
        defaultValue: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    count: {
        type: Number,
        defaultValue: 100000
    },
    min: {
        type: Number,
        defaultValue: 1,
    },
    max: {
        type: Number,
        defaultValue: 100000
    }
})

const env = load({
    ETH_RPC_HTTP_URL: String,
    ETH_RPC_WSS_URL: String,
})

export const httpProvider = new ethers.providers.JsonRpcProvider(env.ETH_RPC_HTTP_URL);
export const wsProvider = new ethers.providers.WebSocketProvider(env.ETH_RPC_WSS_URL);

export default {
    initFrom: args.from,
    count: args.count,
    min: args.min,
    max: args.max,
}