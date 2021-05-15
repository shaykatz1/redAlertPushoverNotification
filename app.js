require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios').default;
const cron = require('node-cron');
var Pushover = require( 'pushover-js').Pushover;
const pushover = new Pushover( process.env.pushoverUser , process.env.pushoverToken);

const LEVEL = {
  INFO: 'info',
  WARN: 'warn',
  ALERT: 'alert'
}

const logger = (txt, level) => {
  let p = chalk.green;
  switch (level) {
    case LEVEL.ALERT: p = chalk.red; break;
    case LEVEL.WARN: p = chalk.yellow; break;
  }
  console.log(p(txt))
}
const options = {
  headers: {
    'Content-type': 'application/json; charset=utf-8',
    'Authorization': `Bearer ${process.env.TOKEN}`
  }
};

function sendMsg(name) {
pushover
.setPriority(1)
.setSound('persistent')
.send(name,'RED ALERT')
.catch((e) => {
    console.error(e)
  })
}



const getAlerts = () => {
  const url = 'https://www.oref.org.il/WarningMessages/alert/alerts.json'
  const options = {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Referer': 'https://www.oref.org.il/12481-he/Pakar.aspx'
    }
  };

  axios.get(url, options).then((res) => {
   
    const rawData = res.data;
    if(!rawData.data) return
    logger([rawData.data, rawData.data.length])
    
    for (let i = 0; i < rawData.data.length; i++) {
      logger(rawData.data[i], LEVEL.WARN)
      
      if(process.env.CITY=='all'){
      } else {
        if (rawData.data[i] == process.env.CITY) {          
       		sendMsg('Rocket alert in your city') 
	 } 
      }     
           
    }
  });
}

getAlerts()
logger('Running a task every 1 second', LEVEL.INFO);  
cron.schedule('*/1 * * * * *', () => {
  getAlerts()
});

