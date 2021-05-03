// Drivers Module

'use strict';

const events = require('../events.js');
const handlers = require('./driver-handlers.js');

events.on('pickup', handlers.logDeliver);
