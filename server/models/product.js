var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String
});

module.exports = mongoose.model('product', ProductSchema);