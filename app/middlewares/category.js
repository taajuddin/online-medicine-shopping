const Category= require('../models/category')

exports.categoryById=(req,res,next,id)=>{

	Category.findById(id).exec((err,category)=>{
		if(err ||!category ){
			return res.status(400).json({
					err:"category doen't exist"
				})	
		}
		req.category=category
		next()
	})
		
		
}