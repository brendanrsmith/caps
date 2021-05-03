'use strict';

// Global Event Pool - shared by all modules

const Events = require('events'); // pull in 1st party Events module (aka EventEmitter)
const events = new Events(); // instatiate application event pool

module.exports = events;