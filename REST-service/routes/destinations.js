const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.ORACLE_FDB_CONNECTION);

// get destinations
router.get('/destinations', (req, res) => {
  knex
    .select()
    .table('TravelPolicy_Destinations')
    .then(destinations => {
      if (!destinations.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          destinations
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

// get destination
router.get('/destinations/:id', (req, res) => {
  const id = req.params.id;

  knex('TravelPolicy_Destinations')
    .where({ POLICY_ID: id })
    .select()
    .then(destination => {
      if (!destination) {
        res.status(204);
        res.send({ error: 'Destination with this policyid not exist.' });
      } else {
        res.status(200);
        res.send({ destination });
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
