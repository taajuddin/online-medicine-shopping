const User = require('../models/user')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')
const auth = {}


auth.signup = (req, res) => {
    const body = req.body 
    const user = new User(body)
    bcryptjs.genSalt()
        .then((salt) => {
            bcryptjs.hash(user.password, salt)
                .then((encrypted) => {
                    user.password = encrypted
                    user.save()
                        .then((user) => {
                            res.json(user)
                        })
                        .catch((err) => {
                            res.json({error:"email already exist"})
                        })
                })
        })
   
        
//     /*
//     const user = new User()
//     user.username = body.username 
//     user.email = body.email
//     user.password = body.password
//     */
 }

auth.signin = (req, res) => {
    const body = req.body 
    User.findOne({ email: body.email }) 
        .then((user) => {
             const users={_id:user._id,name:user.name,email:user.email,role:user.role}
            if(!user) {
                res.json({ 
                    errors: 'invalid email or password'
                })
            }

            bcryptjs.compare(body.password, user.password)
                .then((match) => {
                    if(match) {
                        const tokenData = {
                            _id: user._id,
                            email: user.email,
                            name: user.name
                        }
                        const token = jwt.sign(tokenData, 'taaj123', { expiresIn: '2d'})
                        res.json({
                            token: `Bearer ${token}`, users
                        })
                    } else {
                        res.json({ error: 'invalid email or password'})
                    }
                })
        })
}

auth.account = (req, res) => {
    res.json(req.user)
}



auth.signout = (req, res) => {
    res.clearCookie('taaj123');
    res.json({ message: 'Signout success' });
};

module.exports = auth

