var Product = require('../models/product');
/*  Get All Products */
exports.get_all_products = (req, res) => {
    Product.find({}, (error, products) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(products);
    });
};

/* Get Product by Id */
exports.get_product_by_id = (req, res) => {
    Product.findOne({_id: req.params.id}, function(err, product){
        if(err) return res.status(500).json({error: err});
        if(!product) return res.status(404).json({error: 'product not found'});
        res.set('Access-Control-Allow-Origin', '*');
        res.status(200).json(product);
    })
};

/* Create Product */
exports.create_product = (req, res) => {
    var product = new Product();
    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;

    product.save(function(err){
        if(err){
            console.error(err);
            res.status(404).json({error: 'failed to create product'});
            return;
        }

        res.status(201).json({message: 'product created!'});
    }); 
}

/* UPDATE Product */
exports.update_product = (req, res) => {
    Product.update({ _id: req.params.id }, { $set: req.body }, function(err, output){
        if(err) res.status(500).json({ error: 'database failure' });
        console.log(output);
        if(!output.n) return res.status(404).json({ error: 'product not found' });
        res.json( { product: 'product updated' } );
    });
};

/* DELETE Product */
exports.delete_product = (req, res) => {
    console.log(req.params.id)
    Product.remove({ _id: req.params.id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.status(204).end();
    });
};