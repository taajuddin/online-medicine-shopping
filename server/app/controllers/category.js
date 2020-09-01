const Category = require('../models/category')

const category={}

category.create=(req,res)=>{
	const body=req.body
	const category=new Category(body)
	category.save()
		.then((category)=>{
			res.json(category)
		})
		.catch((err)=>{
			res.json({error:"Category is already exist"})
		})
}

category.read=(req,res)=>{
	return res.json(req.category)
}

category.update=(req,res)=>{
	const category=req.category
	category.name=req.body.name
	category.save()
		.then((data)=>{
			res.json(data)
		})
		.catch((err)=>{
			res.json(err)
		})

}

category.remove=(req,res)=>{
	const category=req.category
	category.deleteOne()
		.then(()=>{
			res.json('category deleted successfully')
		})
		.catch((err)=>{
			res.json(err)
		})

}
category.list=(req,res)=>{
	Category.find()
		.then((data)=>{
			res.json(data)
		})
		.catch((err)=>{
			res.json(err)
		})

}

module.exports=category