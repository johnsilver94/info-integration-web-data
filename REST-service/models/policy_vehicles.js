const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  policyid: {
    type: Number
  },
  in_leasing: { type: Boolean },
  manufacturer: { type: String },
  model: { type: String },
  observations: {
    type: String
  },
  security_system: {
    type: Boolean
  },
  type: { type: String },
  year: { type: Number },
  value: { type: Number }
});

schema.set('toJSON', {
  virtuals: false
});

module.exports = mongoose.model('policy_vehicles', schema);
