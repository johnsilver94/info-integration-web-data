const express = require('express');

const router = express.Router();

const models = require('../models');

// get vehicles
router.get('/vehicles', (req, res) => {
  models.policy_vehicles
    .find(req.query)
    .then(vehicles => {
      if (!vehicles.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          vehicles
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

// get vehicle
router.get('/vehicles/:id', (req, res) => {
  const id = req.params.id;

  models.policy_vehicles
    .findOne({ policyid: id })
    .then(vehicle => {
      if (!vehicle) {
        res.status(204);
        res.send({ error: 'Vehicle with this policyid not exist.' });
      } else {
        res.status(200);
        res.send({ vehicle });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});
// update vehicle
router.put('/vehicles/:id', (req, res) => {
  const id = req.params.id;
  const updateVehicle = req.body;

  models.policy_vehicles
    .findOneAndUpdate(
      { policyid: id },
      { $set: updateVehicle },
      {
        new: true,
        upsert: true,
        useFindAndModify: false
      }
    )
    .then(vehicle => {
      if (!vehicle) {
        res.status(204);
        res.send({ error: 'Vehicle with this policyid not exist.' });
      } else {
        res.status(200);
        res.send({ vehicle });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});
// insert vehicle
router.post('/vehicles', (req, res) => {
  const insertVehicle = req.body;

  models.policy_vehicles
    .findOne({ policyid: insertVehicle.policyid })
    .then(vehicle => {
      if (vehicle) {
        res.status(406);
        res.send({ error: 'Vehicle with this policyid exist.' });
      } else {
        models.policy_vehicles
          .create(insertVehicle)
          .then(createdVehicle => {
            if (!createdVehicle) {
              res.status(500);
              res.send({
                error: 'Error, try later!'
              });
            } else {
              res.status(201);
              res.send({ createdVehicle });
            }
          })
          .catch(err => {
            res.status(500);
            res.send({
              error: 'Error, try later!'
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

// delete vehicle
router.delete('/vehicles/:id', (req, res) => {
  const id = req.params.id;

  models.policy_vehicles
    .findOne({ policyid: id })
    .then(vehicle => {
      if (!vehicle) {
        res.status(204);
        res.send({
          error: 'Vehicle with this policyid: not exist.'
        });
      } else {
        models.policy_vehicles
          .findOneAndDelete({ policyid: id })
          .then(deleted => {
            res.status(200);
            res.send({
              message: `Vehicle with policyid: ${id} are deleted.`
            });
          })
          .catch(err => {
            res.status(500);
            res.send({
              error: 'Error, try later!'
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

module.exports = router;
