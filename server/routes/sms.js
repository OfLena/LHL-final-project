const router = require('express').Router();
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = require('twilio')(accountSid, authToken);


module.exports = () => {
  
  router.post('/', (req, res) => {
    
    client.messages
    .create({
       body:'Your Shopping List! Babyyy',
       from: '+14454466443',
       to: '+15063049911'
     })
     .then(message => console.log(message.sid))
     .catch(e => console.log(e));
  });

  return router;
}





