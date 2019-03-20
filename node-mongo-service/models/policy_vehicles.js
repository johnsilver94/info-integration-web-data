const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: String
});

schema.set('toJSON', {
  virtuals: false
});

module.exports = mongoose.model('policy_vehicles', schema);
