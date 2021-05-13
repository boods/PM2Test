
import yargs from "yargs";
import { Assert } from "./Common"
import { counter, action } from "@pm2/io"

const lArgs: { [x: string]: unknown } = yargs.argv;

Assert(typeof lArgs.Strategy === "string");
Assert(typeof lArgs.Port === "number");
Assert(lArgs.CrashAfter === undefined || typeof lArgs.CrashAfter === "number");

const lStrategy: string = lArgs.Strategy;
const lPort: number = lArgs.Port
const lCrashAfter: number | undefined = lArgs.CrashAfter;


const http = require('http');
http.Server((req: any, res: any) =>
{
    res.writeHead(200);
    res.end(`{ "ServiceType": "Strategy", "Strategy": "${lStrategy}}"`);
}).listen(lPort);

// ---------------------------------------------------
// Setup a PM2 custom metric
// ---------------------------------------------------
var lTradeCounter = counter({
    name: "Trades",
})

setTimeout((): void =>
{ 
    lTradeCounter.inc(1);
}, 30000);

// ---------------------------------------------------
// Setup a PM2 custom action
// ---------------------------------------------------
action("flatten", function(reply: any) {
    console.log("Flatten requested");
    reply({"Message": "Flatten complete"});
});

// ---------------------------------------------------
// Support for testing restarts due to internal errors
// ---------------------------------------------------
if ( lArgs.CrashAfter !== undefined )
{
    console.log(`Crash scheduled for ${lArgs.CrashAfter}ms...`)
    setTimeout((): void =>
    { 
        console.log("Crash triggered");
        throw new Error("Crash simulated");
    }, lArgs.CrashAfter);
}


