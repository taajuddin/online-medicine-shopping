const jwt=require('jsonwebtoken')
const User=require('../models/user')
const expressJwt = require('express-jwt')

const isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};
// const isLogin = (req, res, next) => {
//     const token = req.header('Authorization').split(' ')[1]
//     let tokenData 
//     try {
//         tokenData = jwt.verify(token, 'taaj123')
//         User.findById(tokenData._id)
//             .then((user) => {
//                 req.user = user 
//                 next()
//             })
//             .catch((err) => {
//                 res.json(err)
//             })
       
//     } catch(e) {
//         res.json(e.message)
//     }
// }

// const authorizeUser = () => {

// }



 const isAdmin=(req,res,next)=>{
 	// console.log(req.profile)
 	if(req.profile.role===0){
 		return res.status(403).json({error:'Admin resource! Access Denied'})
 	}
 	next()
 }
 const requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'auth',
     algorithms: ['HS256']
});


module.exports={
	requireSignin,isAuth,isAdmin
}