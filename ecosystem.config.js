module.exports = {
  apps : [
    {
      name: 'Binance',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/Venue.js',
      watch: true,
      args: "--Venue=Binance --Port=3000"
    },
    {
      name: 'OceanEx',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/Venue.js',
      watch: true,
      args: "--Venue=OceanEx --Port=3001"
    },
    {
      name: 'IEX_ETH_BTC',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/IEX.js',
      watch: true,
      args: "--Symbol=ETH_BTC --Port=4000"
    },
    {
      name: 'IEX_LINK_USDT',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/IEX.js',
      watch: true,
      args: "--Symbol=LINK_USDT --Port=4001"
    },
    {
      name: 'OceanEx_ETHBTC',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/Strategy.js',
      watch: true,
      args: "--Strategy=OceanEx_ETHBTC --Port=5001"
    },
    {
      name: 'OceanEx_LINK_USDT',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/Strategy.js',
      watch: true,
      args: "--Strategy=OceanEx_LINK_USDT --Port=5002 --CrashAfter=500"
    },
    {
      name: 'Binance_ETHBTC',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/Strategy.js',
      watch: true,
      args: "--Strategy=Binance_ETHBTC --Port=5003"
    },
    {
      name: 'Binance_LINK_USDT',
      min_uptime: 60000,
      max_restarts: 3,
      restart_delay: 3000,
      script: 'Dist/Src/Strategy.js',
      watch: true,
      args: "--Strategy=Binance_LINK_USDT --Port=5004"
    }
  ],
  deploy : {
    production :
    {
      user : 'phil',
      host : 'DESKTOP-7RDQCFQ',
      ref  : 'origin/master',
      repo : 'https://github.com/boods/PM2Test',
      path : '/home/phil/projects/sandbox/PM2Test/deploy',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
