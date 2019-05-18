const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.ORACLE_DB_CONNECTION);

//get all autodata
router.get('/autodata', (req, res) => {
  knex
    .select()
    .table('AUTODATA')
    .then(autodata => {
      if (!autodata.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          autodata
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

// get autodata by id
router.get('/autodata/:id', (req, res) => {
  const id = req.params.id;

  knex('AUTODATA')
    .where({ CUSTOMER_ID: id })
    .select()
    .then(autodata => {
      if (!autodata) {
        res.status(204);
        res.send({ error: 'Autodata with this customer_id not exist.' });
      } else {
        res.status(200);
        res.send({ autodata });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

//update autodata by id
router.put('/autodata/:id', (req, res) => {
  const id = req.params.id;
  const updateAutodata = req.body;

  knex('AUTODATA')
    .where({ CUSTOMER_ID: id })
    .select()
    .then(autodata => {
      if (!autodata) {
        res.status(204);
        res.send({ error: 'Autodata with this customer_id not exist.' });
      } else {
        knex('AUTODATA')
          .where({ CUSTOMER_ID: id })
          .update(updateAutodata)
          .then(response => {
            if (response) {
              knex('AUTODATA')
                .where({ CUSTOMER_ID: id })
                .select()
                .then(autodata => {
                  res.status(200);
                  res.send({ autodata });
                });
            }
          });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

//insert autodata
router.post('/autodata', (req, res) => {
  const insertAutodata = req.body;

  knex('AUTODATA')
    .where({ CUSTOMER_ID: insertAutodata.CUSTOMER_ID })
    .select()
    .then(autodata => {
      if (Object.keys(autodata).length) {
        console.log(autodata);
        res.status(406);
        res.send({ error: 'Autodata with this customer_id exist.' });
      } else {
        knex('AUTODATA')
          .insert(insertAutodata)
          .then(response => {
            if (response) {
              knex('AUTODATA')
                .where({ CUSTOMER_ID: insertAutodata.CUSTOMER_ID })
                .select()
                .then(autodata => {
                  res.status(201);
                  res.send({ autodata });
                });
            }
          })
          .catch(err => {
            res.status(500);
            res.send({
              error: err.toString()
            });
          });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

// delete autodata by id
router.delete('/autodata/:id', (req, res) => {
  const id = req.params.id;

  knex('AUTODATA')
    .where({ CUSTOMER_ID: id })
    .del()
    .then(response => {
      res.status(200);
      res.send({ message: `Autodata with CUSTOMER_ID: ${id} are deleted.` });
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

module.exports = router;
