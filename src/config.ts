import { JsonRpcProvider, WebSocketProvider } from "ethers";
import { load } from 'ts-dotenv';
import { parse } from "ts-command-line-args";

interface IArguments {
    from: string;
    count: number;
}

const args = parse<IArguments>({
    from: {
        type: String,
        defaultValue: "0x0000000000000000000000000000000000000000"
    },
    count: {
        type: Number,
        defaultValue: 1
    },
})

const env = load({
    RPC_HTTP_URL: String,
    RPC_WS_URL: String,
})

export const httpProvider = new JsonRpcProvider(env.RPC_HTTP_URL);
export const wsProvider = new WebSocketProvider(env.RPC_WS_URL);

export default {
    initFrom: args.from,
    count: args.count
}