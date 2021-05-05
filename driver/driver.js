// Drivers Module

'use strict';

const io = require('socket.io-client');
const handlers = require('./driver-handlers.js');

// connect to caps namespace
let host = 'http://localhost:3000';
const capsConnection = io.connect(`${host}/caps`);

// listeners
capsConnection.on('pickup', handlers.logDeliver);
