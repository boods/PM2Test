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

