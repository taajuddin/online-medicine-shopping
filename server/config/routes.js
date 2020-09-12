const express=require('express')
const router=express.Router()

//cart
const cartController = require('../app/controllers/cartController')

//braintree 
const braintreeController = require('../app/controllers/braintreeController')

 //order
 const order = require('../app/controllers/order')


//user
const { isLogin,isAdmin} = require('../app/middlewares/authenticate')
const auth = require('../app/controllers/auth')
const user = require('../app/controllers/user')
const { userSignupValidator } = require("../app/middlewares/validator");
const {userById,addOrderToUserHistory} = require('../app/middlewares/user')

//category
const category = require('../app/controllers/category')
const {categoryById} = require('../app/middlewares/category')
//product
const {productById,decreaseQuantity} = require('../app/middlewares/product')
const product = require('../app/controllers/product')

//Authentication
 router.post('/signup',userSignupValidator,auth.signup)
 router.post('/signin',auth.signin)
 router.get('/users/account',isLogin,auth.account)
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

//cart routes
router.get('/cart',isLogin,cartController.list)
router.post('/cart',isLogin,cartController.create)
router.put('/cart/qunatity/update',isLogin,cartController.updateQuantity)
router.delete('/cart/delete/all',isLogin,cartController.deleteAll)


//order routes
router.post('/order/create/:userId',isLogin,addOrderToUserHistory,decreaseQuantity, order.create)
router.get('/order/list/:userId',isLogin,isAdmin, order.listOrders)



//braintree payment process 
router.get('/braintree/getToken/:userId',isLogin,braintreeController.generateToken)
router.post('/braintree/payment/:userId',isLogin,braintreeController.processPayment)
//ID
router.param('userId', userById);
router.param('productId',productById)
router.param('categoryId',categoryById)
 
module.exports=router