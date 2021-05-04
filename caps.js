// Main Hub Application

'use strict';

const events = require('./modules/events.js');

require('./modules/driver/driver.js');
require('./modules/vendor/vendor.js');

events.on('pickup', pickupLogger);
events.on('in-transit', transitLogger);
events.on('delivered', deliveredLogger);

// how to DRY this up??? 
function pickupLogger(payload) {
  const eventLog = {
    event: 'pickup',
    time: new Date(),
    payload: payload
  };
  console.log('EVENT:',eventLog);
}

function transitLogger(payload) {
  const eventLog = {
    event: 'in-transit',
    time: new Date(),
    payload: payload
  };
  console.log('EVENT:',eventLog);
}

function deliveredLogger(payload) {
  const eventLog = {
    event: 'delivered',
    time: new Date(),
    payload: payload
  };
  console.log('EVENT:',eventLog);
}