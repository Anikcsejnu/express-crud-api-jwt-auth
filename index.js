const logEvents = require('./logEvent')

const EventEmitter = require('events')

class MyEmitter extends EventEmitter {};

// initialize object
const myEmitter = new MyEmitter();

// ad  listener for the log event
myEmitter.on('log', (msg) =>  logEvents(msg));

setTimeout(() => {
    myEmitter.emit('log', 'Log event emmited');
}, 3000);