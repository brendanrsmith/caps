'use strict';

const events = require('../events.js');

function thankYou(payload) {
  console.log('thank you for your order');
}

setInterval(() => {
  // instantiate a new order event every 5 seconds
  let order = Math.ceil(Math.random() * 100); // TODO placeholder for order object
 
  events.emit('pickup', order);
}, 5000);

module.exports = { thankYou };
