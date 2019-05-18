const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.POSTGRES_CONNECTION);

//get all travelpolicies
router.get('/travelpolicies', (req, res) => {
  knex
    .select()
    .table('TRAVELPOLICY')
    .then(travelpolicies => {
      if (!travelpolicies.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          travelpolicies
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

// get travelpolicy by id
router.get('/travelpolicies/:id', (req, res) => {
  const id = req.params.id;

  knex('TRAVELPOLICY')
    .where({ POLICY_ID: id })
    .select()
    .then(travelpolicy => {
      if (!travelpolicy) {
        res.status(204);
        res.send({ error: 'Travelpolicy with this policy_id_id not exist.' });
      } else {
        res.status(200);
        res.send({ travelpolicy });
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
