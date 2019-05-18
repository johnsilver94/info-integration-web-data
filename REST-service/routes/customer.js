const express = require('express');

const router = express.Router();

const config = require('../config');
var knex = require('knex')(config.ORACLE_DB_CONNECTION);

//get all customers
router.get('/customers', (req, res) => {
  knex
    .select()
    .table('CUSTOMER')
    .then(customers => {
      if (!customers.length) {
        res.status(204);
        res.send('Collection is empty.');
      } else {
        res.status(200);
        res.json({
          customers
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

// get customer by id
router.get('/customers/:id', (req, res) => {
  const id = req.params.id;

  knex('CUSTOMER')
    .where({ ID: id })
    .select()
    .then(customer => {
      if (!customer) {
        res.status(204);
        res.send({ error: 'Customer with this id not exist.' });
      } else {
        res.status(200);
        res.send({ customer });
      }
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

//update customer by id
router.put('/customers/:id', (req, res) => {
  const id = req.params.id;
  const updateCustomer = req.body;

  knex('CUSTOMER')
    .where({ ID: id })
    .select()
    .then(customer => {
      if (!customer) {
        res.status(204);
        res.send({ error: 'Customer with this id not exist.' });
      } else {
        knex('CUSTOMER')
          .where({ ID: id })
          .update(updateCustomer)
          .then(response => {
            if (response) {
              knex('CUSTOMER')
                .where({ ID: id })
                .select()
                .then(customer => {
                  res.status(200);
                  res.send({ customer });
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

//insert customer
router.post('/customers', (req, res) => {
  const insertCustomer = req.body;

  knex('CUSTOMER')
    .where({ ID: insertCustomer.ID })
    .select()
    .then(customer => {
      if (Object.keys(customer).length) {
        console.log(customer);
        res.status(406);
        res.send({ error: 'Customers with this id exist.' });
      } else {
        knex('CUSTOMER')
          .insert(insertCustomer)
          .then(response => {
            if (response) {
              knex('CUSTOMER')
                .where({ ID: insertCustomer.ID })
                .select()
                .then(customer => {
                  res.status(201);
                  res.send({ customer });
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

// delete customer by id
router.delete('/customers/:id', (req, res) => {
  const id = req.params.id;

  knex('CUSTOMER')
    .where({ ID: id })
    .del()
    .then(response => {
      res.status(200);
      res.send({ message: `customer with ID: ${id} are deleted.` });
    })
    .catch(err => {
      res.status(500);
      res.send({
        error: 'Error, try later!'
      });
    });
});

module.exports = router;
