const Bree = require('bree');
const Cabin = require('cabin');
const { Signale } = require('signale');
const Graceful = require('@ladjs/graceful');
// initialize cabin
const cabin = new Cabin({
  axe: {
    logger: new Signale()
  }
});

const bree = new Bree({
  logger: cabin,
  jobs: [
    {
      name: 'email',
      interval: '2m', // how many emails can be sent in 2 minute via nodemailer? 
    },
    {
      name: 'sms',
      interval: '5m', // how many sms can be sent in 5 minutes
    }
  ]
});

// handle graceful reloads, pm2 support, and events like SIGHUP, SIGINT, etc.
const graceful = new Graceful({ brees: [bree] });
graceful.listen();

// start all jobs (this is the equivalent of reloading a crontab):
bree.start();

/* bree.on('worker created', (name) => {
  console.log('worker created', name);
  //console.log(bree.workers[name]);
}); */

/* bree.on('worker deleted', (name) => {
  console.log('worker deleted', name);
}); */
