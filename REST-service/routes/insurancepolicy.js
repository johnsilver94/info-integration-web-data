const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.POSTGRES_CONNECTION);

//get all insurancepolicies
router.get('/insurancepolicies', (req, res) => {
  knex
    .select()
    .table('INSURANCEPOLICY')
    .then(insurancepolicies => {
      if (!insurancepolicies.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          insurancepolicies
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

// get insurancepolicy by id
router.get('/insurancepolicies/:id', (req, res) => {
  const id = req.params.id;

  knex('INSURANCEPOLICY')
    .where({ POLICY_ID: id })
    .select()
    .then(insurancepolicy => {
      if (!insurancepolicy) {
        res.status(204);
        res.send({
          error: 'Insurancepolicy with this policy_id_id not exist.'
        });
      } else {
        res.status(200);
        res.send({ insurancepolicy });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

//update insurancepolicy by id
router.put('/insurancepolicies/:id', (req, res) => {
  const id = req.params.id;
  const updateInsurancePolicy = req.body;

  knex('INSURANCEPOLICY')
    .where({ POLICY_ID: id })
    .select()
    .then(insurancepolicy => {
      if (!insurancepolicy) {
        res.status(204);
        res.send({ error: 'Insurancepolicy with this policy_id not exist.' });
      } else {
        knex('INSURANCEPOLICY')
          .where({ POLICY_ID: id })
          .update(updateInsurancePolicy)
          .then(response => {
            if (response) {
              knex('INSURANCEPOLICY')
                .where({ POLICY_ID: id })
                .select()
                .then(insurancepolicy => {
                  res.status(200);
                  res.send({ insurancepolicy });
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

//insert insurancepolicy
router.post('/insurancepolicies', (req, res) => {
  const insertInsurancePolicy = req.body;

  console.log(insertInsurancePolicy);
  knex('INSURANCEPOLICY')
    .where({ POLICY_ID: insertInsurancePolicy.POLICY_ID })
    .select()
    .then(insurancepolicy => {
      if (Object.keys(insurancepolicy).length) {
        console.log(insurancepolicy);
        res.status(406);
        res.send({ error: 'Insurancepolicy with this policy_id exist.' });
      } else {
        knex('INSURANCEPOLICY')
          .insert(insertInsurancePolicy)
          .then(response => {
            if (response) {
              knex('INSURANCEPOLICY')
                .where({ POLICY_ID: insertInsurancePolicy.POLICY_ID })
                .select()
                .then(insurancepolicy => {
                  res.status(201);
                  res.send({ insurancepolicy });
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

// delete insurancepolicy by id
router.delete('/insurancepolicies/:id', (req, res) => {
  const id = req.params.id;

  knex('INSURANCEPOLICY')
    .where({ POLICY_ID: id })
    .del()
    .then(response => {
      res.status(200);
      res.send({
        message: `Insurancepolicy with policy_id: ${id} are deleted.`
      });
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

module.exports = router;
