'use strict';

const events = require('../events.js');
const faker = require('faker');

function thankYou(payload) {
  console.log(`VENDOR: thank you for delivering ${payload.orderID}`);
}

setInterval(() => {
  // instantiate a new order event every 5 seconds
  let order = {
    storeName: faker.company.companyName(),
    orderID: faker.random.alphaNumeric(10),
    customerName: faker.name.findName(),
    address: faker.address.streetAddress()
  };
  events.emit('pickup', order);
}, 5000);

module.exports = { thankYou };
