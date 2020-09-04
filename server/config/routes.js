const express=require('express')
const router=express.Router()


//user
const { requireSignin,isAuth,isLogin,isAdmin} = require('../app/middlewares/authenticate')
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
 router.get('/signout',isLogin,auth.signout)

 //users Routes
 router.get('/user/:userId',isLogin, user.read)
 router.put("/user/:userId",isLogin,user.update)
 

 //category
 router.get("/category/:categoryId",category.read)
 router.post('/category/create/:userId',isLogin,isAdmin,category.create)
 router.put('/category/:categoryId/:userId',isLogin,isAdmin,category.update)
 router.delete('/category/:categoryId/:userId',isLogin,isAdmin,category.remove)
 router.get("/categories",category.list)


 //Product routes
 router.get("/product/:productId",product.read)
router.post("/product/create/:userId",isLogin,isAdmin,product.create)
router.delete("/product/:productId/:userId",isLogin,isAdmin, product.remove)
router.put("/product/:productId/:userId",isLogin,isAdmin,product.update)
router.get("/products", product.list)
router.get("/products/related/:productId",product.listRelated)
router.get("/products/categories",product.listCategories)
router.post("/products/by/search",product.listBySearch)
router.get("/product/photo/:productId", product.photo)
router.get("/products/search",product.listSearch)


//ID
router.param('userId', userById);
router.param('productId',productById)
router.param('categoryId',categoryById)
 
module.exports=router