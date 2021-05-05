'use strict';

// connect to caps namespace
const io = require('socket.io-client');
let host = 'http://localhost:3000';
const capsConnection = io.connect(`${host}/caps`);

const handlers = {};

handlers.logdeliver = (payload) => {

  setTimeout(function() {
    console.log(`Picking up ${payload.order.orderID}`); // plug in order id from payload
    payload.event = 'in-transit';
    payload.time = new Date();
    capsConnection.emit('in-transit', payload);
  }, 1500);

  setTimeout(function() {
    console.log(`DRIVER: delivered order ${payload.order.orderID}`);
    payload.event = 'delivered';
    payload.time = new Date();
    capsConnection.emit('delivered', payload);
  }, 3000);

}

module.exports = handlers;
