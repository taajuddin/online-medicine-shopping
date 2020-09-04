const User = require('../models/user');

const user={}

user.read=(req,res)=>{
	//req.user.password=undefined
	return res.json(req.user)

}
user.update=(req,res)=>{
	User.findOneAndUpdate({_id:req.user._id},{$set:req.body},{new:true},(err,user)=>{
		if(err){
			return res.status(400).json({
				error:"you are not authorized to perform this task"
			})
		}
		//user.password=undefined
		res.json(user)
	})

}


module.exports=user
