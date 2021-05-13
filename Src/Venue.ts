
import yargs from "yargs";
import { Assert } from "./Common"

const lArgs: { [x: string]: unknown } = yargs.argv;

Assert(typeof lArgs.Venue === "string");
Assert(typeof lArgs.Port === "number");
const lVenue: string = lArgs.Venue;
const lPort: number = lArgs.Port

const http = require('http');
http.Server((req: any, res: any) =>
{
    res.writeHead(200);
    res.end(`{ "ServiceType": "Venue", "Venue": "${lVenue}}"`);
}).listen(lPort);
