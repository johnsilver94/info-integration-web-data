const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.ORACLE_DB_CONNECTION);

//get all profiles
router.get('/profiles', (req, res) => {
  knex
    .select()
    .table('PROFILE')
    .then(profiles => {
      if (!profiles.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          profiles
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

// get profile by id
router.get('/profiles/:id', (req, res) => {
  const id = req.params.id;

  knex('PROFILE')
    .where({ CUSTOMER_ID: id })
    .select()
    .then(profile => {
      if (!profile) {
        res.status(204);
        res.send({ error: 'Profile with this customer_id not exist.' });
      } else {
        res.status(200);
        res.send({ profile });
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
