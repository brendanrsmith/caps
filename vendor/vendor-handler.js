'use strict';

const handlers = {};

handlers.thankyou = (payload) => {
  console.log(`VENDOR: thank you for delivering order ${payload.order.orderID}`);
}

module.exports = handlers;
