const User = require('../models/user');
const { Order} = require('../models/order');

const user={}

user.read=(req,res)=>{
	//req.user.password=undefined
	return res.json(req.profile)

}
user.update=(req,res)=>{
	User.findOneAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},(err,user)=>{
		if(err){
			return res.status(400).json({
				error:"you are not authorized to perform this task"
			})
		}
		//user.password=undefined
		res.json(user)
	})

}


user.purchaseHistory = (req, res) => {
    Order.find({ user: req.profile._id })
        .populate('user', '_id name')
        .sort('-created')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: 'can not any history'
                });
            }
            res.json(orders);
        });
};


module.exports=user
