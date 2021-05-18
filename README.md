# RedAlertPushoverNotification

RedAlertPushoverNotification is a node js library for sending a notification to your phone via the pushover app, of a red alert (צבע אדום) in your city
This is especially useful for iphone users, as the pushover app allows your to bypass DND mode and silent mode via the critical alerts feature.

## Installation

Install the necessary pushover-js package

```
npm install --save pushover-js
```


clone the project and install it 

```
npm install
```

## Prerequisite

you need to create a personal token for pushover, and the pushover app installed on your phone :
https://pushover.net/
in the iphone notification settings for the pushover app, go to settings and make sure you allow critical alerts.
in the pushover app on iphone, go to settings and make sure to allow "Critical Alerts for high-priority"

- update [./.env](.env) file with your personal pushover user ID, pushover token, city , notification sound and notification priority
  default is set to echo sound and priority 1. For more information on pushover api: https://pushover.net/api 
- city is your alert area, and it should be written exactly as written in hebrew by Pikud Ha'oref. For example: "תל אביב - מרכז העיר"

## Usage
```
npm run start
```

in any case of red alert in your city - the script should notify you via the pushover app
**Attention: This is not an official Pikud Ha'oref app**, and I have personaly seen a delay of up to 30 seconds in alerts.

If you would like for this app to run in the backgroud continously, you can use the following:
```
sudo npm install pm2 -g
```
when pm2 finisehs installing, run:
```
pm2 --name redAlert start npm -- start
```
and now the app should run in the background

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
