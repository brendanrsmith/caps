'use strict';

const events = require('../events');


function logDeliver(payload) {

  setTimeout(function() {
    console.log(`DRIVER: picked up ${payload.orderID}`); // plug in order id from payload
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(function() {
    console.log(`DRIVER: delivered order ${payload.orderID}`);
    events.emit('delivered', payload);
  }, 3000);

}

module.exports = { logDeliver };
