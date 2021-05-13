# PM2 Sandbox application

## Design
Three simple web services: 
- Src\Venue.ts
- Src\IEX.ts
- Src\Strategy.ts

Each service listens for http requests on a separate port, and spits out a JSON doc containing the basic parameters of the service instance in reponse to a GET call.

PM2 eco system file: (ecosystem.config.js)
- Defines 2 venues, 2 IEX instances, and 4 strategies
- Each defines a min_uptime=60,000ms and max_restarts=3, so if you restart a service 3 times in less than 60 seconds, it will remain stopped

Strategy Features
The Strategy service has some features to test out some PM2 features: 
- optional "CrashAfter" period (in ms), to throw an error internally, and prove that PM2 detects and restarts after the error
- Custom PM2 metric (counter), showing a trade count (which ticks up by 1 every minute)
- Custom PM2 action, "flatter", which proves the ability to send special commands to a service. This can be initiated with the following command: 
```
pm2 trigger Binance_LINK_USDT flatten
```


## Installation 

To install: 
```
npm install pm2 -g
npm install
gulp build
```

## Usage

To launch all services: 
```
pm2 start ecosystem.config.js
```

To stop all services: 
```
pm2 stop ecosystem.config.js
```

To monitor via the console: 
```
pm2 monit
```

To execute the "flatten" custom action: 
(You can use any strategy name, not just Binance_LINK_USDT. The name needs to match the "name" in the ecosystem file)
```
pm2 trigger Binance_LINK_USDT flatten
```
