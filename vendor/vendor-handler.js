'use strict';

const handlers = {};

handlers.thankYou = (payload) => {
  console.log(`Thank you for delivering order ${payload.order.orderID}`);
}

module.exports = handlers;
