// Main Hub Application
'use strict';

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

// start socket.io server on PORT
const io = require('socket.io')(port);

// setup namespaces
const caps = io.of('/caps');

// monitor events on 'caps' namespace
io.on('connection', socket => {
  console.log(socket.id);
});

caps.on('connection', socket => {

  socket.on('pickup', payload => {
    packageLogger(payload);
    socket.broadcast.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    packageLogger(payload);
    caps.emit('in-transit', payload);
  });

  socket.on('delivered', payload => {
    packageLogger(payload);
    caps.emit('delivered', payload);
  });

});

function packageLogger(payload) {
  console.log('EVENT:',payload);
}
