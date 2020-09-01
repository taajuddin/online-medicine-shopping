const express=require('express')
const router=express.Router()


//user
const { requireSignin,isAuth,isAdmin} = require('../app/middlewares/authenticate')
const auth = require('../app/controllers/auth')
const user = require('../app/controllers/user')
const { userSignupValidator } = require("../app/middlewares/validator");
const {userById} = require('../app/middlewares/user')

//category
const category = require('../app/controllers/category')
const {categoryById} = require('../app/middlewares/category')
//product
const {productById} = require('../app/middlewares/product')
const product = require('../app/controllers/product')

//Authentication
 router.post('/signup',userSignupValidator,auth.signup)
 router.post('/signin',auth.signin)
 router.get('/signout',requireSignin,isAuth,auth.signout)

 //users Routes
 router.get('/user/:userId',requireSignin,isAuth, user.read)
 router.put("/user/:userId",requireSignin,isAuth,user.update)
 

 //category
 router.get("/category/:categoryId",category.read)
 router.post('/category/create/:userId',requireSignin,isAuth,isAdmin,category.create)
 router.put('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,category.update)
 router.delete('/category/:categoryId/:userId',requireSignin,isAuth,isAdmin,category.remove)
 router.get("/categories",category.list)


 //Product routes
 router.get("/product/:productId",product.read)
router.post("/product/create/:userId",requireSignin,isAuth,isAdmin,product.create)
router.delete("/product/:productId/:userId",requireSignin,isAuth,isAdmin, product.remove)
router.put("/product/:productId/:userId",requireSignin,isAuth,isAdmin,product.update)
router.get("/products", product.list)
router.get("/products/related/:productId",product.listRelated)
router.get("/products/categories",product.listCategories)
router.post("/products/by/search",product.listBySearch)
router.get("/product/photo/:productId", product.photo)


//ID
router.param('userId', userById);
router.param('productId',productById)
router.param('categoryId',categoryById)
 
module.exports=router