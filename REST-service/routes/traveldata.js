const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.ORACLE_DB_CONNECTION);

//get all traveldata
router.get('/traveldata', (req, res) => {
  knex
    .select()
    .table('TRAVELDATA')
    .then(traveldata => {
      if (!traveldata.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          traveldata
        });
      }
    })
    .catch(err => {
      console.log(err.toString());
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

// get traveldata by id
router.get('/traveldata/:id', (req, res) => {
  const id = req.params.id;

  knex('TRAVELDATA')
    .where({ CUSTOMER_ID: id })
    .select()
    .then(traveldata => {
      if (!traveldata) {
        res.status(204);
        res.send({ error: 'Traveldata with this customer_id not exist.' });
      } else {
        res.status(200);
        res.send({ traveldata });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

module.exports = router;
