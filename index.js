const token = require('./token')
const proxyURI = require('./proxy');
const MeetingBot = require('./MeetingBot');

const Agent = require('proxy-agent');
const agent = new Agent(proxyURI);
const config = {telegram: {agent}};


bot = new MeetingBot({token, config});
bot.start();