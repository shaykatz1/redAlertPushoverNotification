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

you need to create a personal token for pushover, and the pushover app installed on your phone 

- update [./.env](.env) file with your personal pushover user ID, pushover token, and your city
- update [./.env](.env) file with your selected sound and notification pririty.
  default is set to siren sound and priority 1. For more information on pushover api: https://pushover.net/api 

## Usage
```
npm run start
```

in any case of red alert in your city - the script should notify you via the pushover app

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
