const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes');
const config = require('./config');

//database
mongoose.connection
  .on('error', error => console.log(error))
  .on('close', () => console.log * 'Database connedction closed.')
  .once('open', () => {
    const info = mongoose.connections[0];
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  });

mongoose.connect(config.MONGO_URL, {
  useNewUrlParser: true
  //   auth: {
  //     user: config.user,
  //     password: config.password
  //   }
});

//express
const app = express();

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

//routes
app.use('/', routes.mongo);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json({ err });
});

app.listen(config.PORT, () =>
  console.log(`Example app listening on port ${config.PORT}!`)
);
