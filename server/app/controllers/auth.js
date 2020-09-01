// const User = require('../models/user')
// const bcryptjs=require('bcryptjs')
// const jwt=require('jsonwebtoken')
// const {errorHandler}=require('../dbError/dbError')
// const auth = {}


// auth.signup = (req, res) => {
//     const body = req.body 
//     const user = new User(body)
//     bcryptjs.genSalt()
//         .then((salt) => {
//             bcryptjs.hash(user.password, salt)
//                 .then((encrypted) => {
//                     user.password = encrypted
//                     user.save()
//                         .then((user) => {
//                             res.json(user)
//                         })
//                         .catch((err) => {
//                             res.json({error:"email already exist"})
//                         })
//                 })
//         })
   
        
//     /*
//     const user = new User()
//     user.username = body.username 
//     user.email = body.email
//     user.password = body.password
//     */
// }

// auth.signin = (req, res) => {
//     const body = req.body 
//     User.findOne({ email: body.email }) 
//         .then((user) => {
//              const users={_id:user._id,name:user.name,email:user.email,role:user.role}
//             if(!user) {
//                 res.json({ 
//                     errors: 'invalid email or password'
//                 })
//             }

//             bcryptjs.compare(body.password, user.password)
//                 .then((match) => {
//                     if(match) {
//                         const tokenData = {
//                             _id: user._id,
//                             email: user.email,
//                             name: user.name
//                         }
//                         const token = jwt.sign(tokenData, 'taaj123', { expiresIn: '2d'})
//                         res.json({
//                             token: `Bearer ${token}`, users
//                         })
//                     } else {
//                         res.json({ error: 'invalid email or password'})
//                     }
//                 })
//         })
// }

const User = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../dbError/dbError');
const auth = {}

// using promise
auth.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Email is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

// using async/await
// exports.signup = async (req, res) => {
//     try {
//         const user = await new User(req.body);
//         console.log(req.body);

//         await user.save((err, user) => {
//             if (err) {
//                 // return res.status(400).json({ err });
//                 return res.status(400).json({
//                     error: 'Email is taken'
//                 });
//             }
//             res.status(200).json({ user });
//         });
//     } catch (err) {
//         console.error(err.message);
//     }
// };

auth.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User with that email does not exist. Please signup'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('taaj123', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};



auth.signout = (req, res) => {
    res.clearCookie('taaj123');
    res.json({ message: 'Signout success' });
};

module.exports = auth