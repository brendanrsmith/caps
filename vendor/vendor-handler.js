'use strict';

const handlers = {};

handlers.thankyou = (payload) => {
  console.log(`Thank you for delivering order #${payload.order.orderID}`);
}

module.exports = handlers;
