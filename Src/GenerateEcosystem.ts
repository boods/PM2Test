import * as Fs from "fs";
import * as nunjucks from "nunjucks";
import * as Path from "path";

type TExchangeDefinition =
{
    Name: string;
    Port?: number;
}
const lExchanges: TExchangeDefinition[] = [
    { Name: "Binance" },
    { Name: "FTX" },
    { Name: "OceanEx" },
];

type TStrategyDefinition =
{
    Type: string; 
    Exchange: string;
    Symbol: string;
    Port?: number;
};

const lStrategies: TStrategyDefinition[] = [
    { Type: "CARB", Exchange: "Binance", Symbol: "ETH_BTC" },
    { Type: "CARB", Exchange: "Binance", Symbol: "LINK_USDT" },
    { Type: "CARB", Exchange: "FTX", Symbol: "ETH_BTC" },
    { Type: "CARB", Exchange: "OceanEx", Symbol: "ETH_BTC" },
    { Type: "CARB", Exchange: "OceanEx", Symbol: "LINK_USDT" },
]

type TIEXDefintion =
{
    Symbol: string;
    Port: number;
}

function GenerateExchangePorts(aBasePort: number): void
{
    for (let i: number = 0; i < lExchanges.length; i++)
    {
        lExchanges[i].Port = aBasePort + i;
    }
}

function GenerateStrategyPorts(aBasePort: number): void
{
    for (let i: number = 0; i < lStrategies.length; i++)
    {
        lStrategies[i].Port = aBasePort + i;
    }
}

function GenerateIEXDefinitions(aBasePort: number): TIEXDefintion[]
{
    let lIEXDefinitions: TIEXDefintion[] = [];
    for (let i: number = 0; i < lStrategies.length; i++)
    {
        const lMatch: TIEXDefintion | undefined = lIEXDefinitions.find(match => match.Symbol === lStrategies[i].Symbol);
        if (lMatch === undefined)
        {
            lIEXDefinitions.push(
                {
                    Symbol: lStrategies[i].Symbol,
                    Port: aBasePort + lIEXDefinitions.length,
                }
            );
        }
    }
    return lIEXDefinitions;
}


function GenerateEcosystemFile()
{
    GenerateExchangePorts(3000);
    GenerateStrategyPorts(4000);
    const lIEXDefinitions: TIEXDefintion[] = GenerateIEXDefinitions(5000);

    const lContext: any = {
        ExchangeList: lExchanges,
        StrategyList: lStrategies,
        IEXList: lIEXDefinitions,
    };

    const lPath: string = Path.normalize(`${__dirname}/../Templates`);

    nunjucks.configure(lPath, { autoescape: true });
    const lTemplate: string = Fs.readFileSync(`${lPath}/ecosystem.config.template`,"utf8");
    const lFileContent: string = nunjucks.renderString(lTemplate, lContext);

    const lOutputFile: string = `${__dirname}/../ecosystem.config.js`;
    Fs.writeFileSync(lOutputFile, lFileContent);
}

GenerateEcosystemFile()