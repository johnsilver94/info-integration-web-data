const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config');

//database
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log * 'Database connection closed.')
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true
});

//express
const app = express();

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//routes
app.use('/', routes.vehicles);
app.use('/', routes.destinations);
app.use('/', routes.autodata);
app.use('/', routes.customer);
app.use('/', routes.profile);
app.use('/', routes.traveldata);
app.use('/', routes.autopolicy);
app.use('/', routes.insurancepolicy);
app.use('/', routes.travelpolicy);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json({ err });
});

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
);
