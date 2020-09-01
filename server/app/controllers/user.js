const User = require('../models/user');

const user={}

user.read=(req,res)=>{
	req.profile.hashed_password=undefined
	return res.json(req.profile)

}
user.update=(req,res)=>{
	User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},(err,user)=>{
		if(err){
			return res.status(400).json({
				error:"you are not authorized to perform this task"
			})
		}
		user.hashed_password=undefined
		user.salt=undefined
		res.json(user)
	})

}


module.exports=user
