const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.POSTGRES_CONNECTION);

//get all autopolicy
router.get('/autopolicies', (req, res) => {
  knex
    .select()
    .table('AUTOPOLICY')
    .then(autopolicies => {
      if (!autopolicies.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          autopolicies
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

// get autopolicy by id
router.get('/autopolicies/:id', (req, res) => {
  const id = req.params.id;

  knex('AUTOPOLICY')
    .where({ POLICY_ID: id })
    .select()
    .then(autopolicy => {
      if (!autopolicy) {
        res.status(204);
        res.send({ error: 'Autopolicy with this policy_id_id not exist.' });
      } else {
        res.status(200);
        res.send({ autopolicy });
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
