'use strict';

const events = require('../events.js');
const faker = require('faker');
const dotenv = require('dotenv');
dotenv.config();

function thankYou(payload) {
  console.log(`VENDOR: thank you for delivering order ${payload.order.orderID}`);
}

setInterval(() => {
  // instantiate a new order event every 5 seconds
  let order = {
    storeName: process.env.storeName,
    orderID: faker.random.alphaNumeric(10),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  
  let packageObj = {
    event: 'pickup',
    time: new Date(),
    order: order
  }
  
  events.emit('pickup', packageObj);
}, 5000);

module.exports = { thankYou };
