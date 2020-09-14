const Product= require('../models/product')


exports.productById=(req,res,next,id)=>{

	Product.findById(id).exec((err,product)=>{
		if(err ){
			return res.status(400).json({
					error:"product not found"
				})	
		}
		req.product=product
		next()
	})
		
		
}

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item._id },
                update: { $inc: { quantity: -item.count, sold: +item.count } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next()
    })
};