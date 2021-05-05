// Main Hub Application
'use strict';

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3333;

// const events = require('./modules/events.js');

// start socket.io server on PORT
const io = require('socket.io')(port);

// setup namespaces
const caps = io.of('/caps');

// require('./modules/driver/driver.js');
// require('./modules/vendor/vendor.js');

// monitor events on 'caps' namespace
caps.on('connection', socket => {
  
  socket.on('pickup', payload => {
    packageLogger(payload);
  });

  socket.on('in-transit', payload => {
    packageLogger(payload);
  });

  socket.on('delivered', payload => {
    packageLogger(payload);
  });

});

function packageLogger(payload) {
  console.log('EVENT:',payload);
}
