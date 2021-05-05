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

  // this is our own 'join' event that we register
  socket.on('join', room => {
    console.log('room name:', room);
    // this join method is builtin to socket.io
    socket.join(room);
  })

  socket.on('pickup', payload => {
    packageLogger(payload);
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    packageLogger(payload);
    caps.to(payload.order.storeID).emit('in-transit', payload); // emits only to clients that are connected to `storeID` ROOM
  });

  socket.on('delivered', payload => {
    packageLogger(payload);
    caps.to(payload.order.storeID).emit('delivered', payload);
  });

});

function packageLogger(payload) {
  console.log('EVENT:',payload);
}
