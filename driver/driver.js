// Drivers Module

'use strict';

const io = require('socket.io-client');
const handlers = require('./driver-handlers.js');

// connect to caps namespace
const host = process.env.SERVER_URL || 'http://localhost:3000';
const socket = io.connect(`${host}/caps`);

// listeners
socket.on('pickup', handlers.logdeliver);
