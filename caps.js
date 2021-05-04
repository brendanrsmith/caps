// Main Hub Application

'use strict';

const events = require('./modules/events.js');

require('./modules/driver/driver.js');
require('./modules/vendor/vendor.js');

events.on('pickup', packageLogger);
events.on('in-transit', packageLogger);
events.on('delivered', packageLogger);

function packageLogger(payload) {
  console.log('EVENT:',payload);
}
