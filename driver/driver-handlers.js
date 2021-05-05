'use strict';

// connect to caps namespace
const io = require('socket.io-client');
const host = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

const handlers = {};

handlers.logdeliver = (payload) => {

  setTimeout(function() {
    console.log(`Picking up ${payload.order.orderID}`);
    payload.event = 'in-transit';
    payload.time = new Date();
    socket.emit('in-transit', payload);
  }, 1500);

  setTimeout(function() {
    console.log(`Delivered order ${payload.order.orderID}`);
    payload.event = 'delivered';
    payload.time = new Date();
    socket.emit('delivered', payload);
  }, 3000);

}

module.exports = handlers;
