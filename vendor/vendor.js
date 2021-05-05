// Vendor Module

'use strict';

const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();
const storeID = process.env.STOREID;

const io = require('socket.io-client');
const handlers = require('./vendor-handler.js');

// connect to caps namespace
const host = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

// join room 'STOREID'
socket.emit('join', storeID);

// listeners
socket.on('delivered', handlers.thankYou);

setInterval( () => {
  // instantiate a new order event every 5 seconds
  let order = {
    storeID: storeID,
    orderID: faker.datatype.uuid(),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  
  socket.emit('pickup', order);
}, 5000);