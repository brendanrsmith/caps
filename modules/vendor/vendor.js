// Vendor Module

'use strict';

const events = require('../events.js');
const handlers = require('./vendor-handler.js');

events.on('delivered', handlers.thankYou);
