'use strict';

/* jshint maxlen: false */
/* jshint quotmark: false */
/* jshint newcap: false */

var _                    = require('lodash');
var mongoose             = require('mongoose');
var Product                 = mongoose.model('product');

// function clearDb() {
//   var ops = _(mongoose.models)
//     .keys()
//     .map(modelName => mongoose.model(modelName).remove())
//     .value();

//   return Promise.all(ops);
// }

function insertProducts() {
  var products = [
    {id: 1, name: 'BR15DEF', description: 'THE DEFENDER 5.56MM.', price: 798},
    {id: 2, name: 'BR4101T', description: 'BR4- 16" CARBINE LENGTH 5.56MM "Trooper"', price: 995},
    {id: 3, name: 'BR4101F', description: 'BR4- 14.5 CARBINE LENGTH 5.56MM Trooper.', price: 1195}
  ];
  return Product.create(products);
}


insertProducts()
  .then(() => console.log('All scripts applied succesfully'))
  .catch(err => console.log('The scripts are not applied', err))
