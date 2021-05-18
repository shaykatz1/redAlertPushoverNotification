require('dotenv').config();
const chalk = require('chalk');
const axios = require('axios').default;
const cron = require('node-cron');
var Pushover = require( 'pushover-js').Pushover;
const pushover = new Pushover( process.env.pushoverUser , process.env.pushoverToken);
var counter = 91;
var alertInterval=90;

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

function sendMsg(name,sound,priority) {
pushover
.setPriority(priority)
.setSound(sound)
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
		if (counter>alertInterval){
			sendMsg('Alert Not In your area', process.env.pushoverSound, process.env.pushoverPriority)
			counter=0	
		}
	} else {
        if (rawData.data[i] == process.env.CITY) {          
       		if (counter>alertInterval){	
			sendMsg('Rocket alert in your city', process.env.pushoverSound, process.env.pushoverPriority) 
	 	 	counter=0	
		}	 
	}
}     
           
    }
  });
}

getAlerts()
logger('Running a task every 1 second', LEVEL.INFO);  
cron.schedule('*/1 * * * * *', () => {
if (counter<=alertInterval){
  counter=counter+1
}
  getAlerts()
});

