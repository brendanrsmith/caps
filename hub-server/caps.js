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

  console.log('connected socket', socket.id);

  // this is our own 'join' event that we register
  socket.on('join', room => {
    console.log(socket.id, 'joined room', room);
    // this join method is builtin to socket.io
    socket.join(room);
  })

  socket.on('pickup', payload => {
    packageLogger(payload, 'pickup');
    caps.emit('pickup', payload);
  });

  socket.on('in-transit', payload => {
    packageLogger(payload, 'in-transit');
    caps.to(payload.store).emit('in-transit', payload); // emits only to clients that are connected to `store` ROOM
  });

  socket.on('delivered', payload => {
    packageLogger(payload, 'delivered');
    caps.to(payload.store).emit('delivered', payload);
  });

});

function packageLogger(payload, event) {
  let time = new Date();
  console.log('EVENT:', { event, time, payload });
}
