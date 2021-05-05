// API Server

'use strict';

const express = require('express');
const cors = require('cors');
const faker = require('faker');
const io = require('socket.io-client');
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3000';

// connects our socket.io client to the socket.io server living on 3000, then connects to our namespace 'caps'
const socket = io.connect(`${SERVER_URL}/caps`); 

const app = express();
const PORT = process.env.PORT || 3001; // we are using port 3000 for caps.js server

app.use(cors()); // opens api to all users
app.use(express.json()); // allows for POST or PUT requests with a req.body
app.use(express.urlencoded({ extended : true })); // req.body can be sent from a html <form>

app.post('/caps', (req, res) => {
  let order = req.body || {
    store: '1-800-vendor',
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: faker.address.streetAddress()
  };

  socket.emit('pickup', order);
  res.status(200).send('your package pickup was scheduled');
});

// Start up server
app.listen(PORT, () => {
  console.log(`api server up on port ${PORT}`);
});
