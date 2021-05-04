'use strict';

const events = require('../events');


function logDeliver(payload) {

  setTimeout(function() {
    console.log(`DRIVER: picked up order ${payload.order.orderID}`); // plug in order id from payload
    payload.event = 'in-transit';
    payload.time = new Date();
    events.emit('in-transit', payload);
  }, 1000);

  setTimeout(function() {
    console.log(`DRIVER: delivered order ${payload.order.orderID}`);
    payload.event = 'delivered';
    payload.time = new Date();
    events.emit('delivered', payload);
  }, 3000);

}

module.exports = { logDeliver };
