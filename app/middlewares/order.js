const { Order, CartItem } = require('../models/order');

exports.orderById=(req,res,next,id)=>{
	Order.findById(id)
	.populate("products.product","name price")
	.exec((err,order)=>{
			if(err ||!order){
				return res.status(400).json({
					error:"can not able to find id"
				})
			}
			req.order=order
			next()
	})
}
