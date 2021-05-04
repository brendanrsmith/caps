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
  console.log('EVENT:',payload);
}

function transitLogger(payload) {
  console.log('EVENT:', payload);
}

function deliveredLogger(payload) {
  console.log('EVENT:', payload);
}