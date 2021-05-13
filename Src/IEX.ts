
import yargs from "yargs";
import { Assert } from "./Common"

const lArgs: { [x: string]: unknown } = yargs.argv;

Assert(typeof lArgs.Symbol === "string");
Assert(typeof lArgs.Port === "number");
const lSymbol: string = lArgs.Symbol;
const lPort: number = lArgs.Port

const http = require('http');
http.Server((req: any, res: any) =>
{
    res.writeHead(200);
    res.end(`{ "ServiceType": "IEX", "Symbol": "${lSymbol}}"`);
}).listen(lPort);
