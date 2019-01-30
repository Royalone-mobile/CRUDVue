 // get our mongoose model
const ProductController = require('./controllers/product');
module.exports = function(app) {
  app.get('/', function(req, res) {
    res.send({ hi: 'there' });
  });
  app.get('/product/all', ProductController.get_all_products);
  app.get('/product/get/:id', ProductController.get_product_by_id);
  app.post('/product', ProductController.create_product);
  app.put('/product/:id', ProductController.update_product);
  app.delete('/product/:id', ProductController.delete_product);
}