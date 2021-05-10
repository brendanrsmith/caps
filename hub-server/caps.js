// Main Hub Application
'use strict';

const uuid = require('uuid').v4;
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 3000;

// in-memory order message queue
const orderQueue = {
  order : {} //retailer, event name, messageID
}
// start socket.io server on PORT
const io = require('socket.io')(port);

// setup namespaces
const caps = io.of('/caps');

  // monitor events on 'caps' namespace
caps.on('connection', socket => {

  console.log('connected socket', socket.id);

  // this is our own 'join' event that we register
  socket.on('join', room => {
    console.log(socket.id, 'joined room', room);
    // this join method is builtin to socket.io
    socket.join(room);
  })

  socket.on('received', payload => {
    // When this event is heard on the server, assume it’s the client telling you they got a message
    // The payload should include the client id, event name, and message id, so that you can delete it from the queue
    delete orderQueue.order[payload[0]];
  });

  socket.on('getAll', storeID => {
    // The payload should include the client id and event name
    // When this event is heard on the server, find each of the messages in the queue for the client, for the event specified
    // Go through each of the entries for the client/event in the queue (if any) and broadcast them to the client
    Object.entries(orderQueue.order).forEach(order => {
      if (order.values.store === storeID.id) { // is this right?
        socket.emit('order-update', order);
      }
    })
  });

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

    let id = payload.orderID;
    orderQueue.order[id] = payload;
    console.log('current message queue', orderQueue);
    socket.emit('added');
    caps.to(payload.store).emit({messageID: id, payload: payload}); // emit delivery conf to subscribers
  });

});

function packageLogger(payload, event) {
  let time = new Date();
  console.log('EVENT:', { event, time, payload });
}
