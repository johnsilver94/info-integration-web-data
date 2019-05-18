//mongo
const vehicles = require('./vehicles');
//fdb
const destinations = require('./destinations');
//oracledb
const autodata = require('./autodata');
const customer = require('./customer');
const profile = require('./profile');
const traveldata = require('./traveldata');
//postgres
const autopolicy = require('./autopolicy');
const insurancepolicy = require('./insurancepolicy');
const travelpolicy = require('./travelpolicy');

module.exports = {
  vehicles,
  destinations,
  autodata,
  customer,
  profile,
  traveldata,
  autopolicy,
  insurancepolicy,
  travelpolicy
};
