// Vendor Module

'use strict';

const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();
const storeID = process.env.STOREID;

const io = require('socket.io-client');
const handlers = require('./vendor-handler.js');

// connect to caps namespace
let host = 'http://localhost:3000';
const capsConnection = io.connect(`${host}/caps`);

// listeners
capsConnection.on('delivered', handlers.thankYou);

setInterval( () => {
  // instantiate a new order event every 5 seconds
  let order = {
    storeID: storeID,
    orderID: faker.random.alphaNumeric(10),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  
  let packageObj = {
    event: 'pickup',
    time: new Date(),
    order: order
  }
  
  capsConnection.emit('pickup', packageObj);
}, 5000);