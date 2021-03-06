const express=require('express')
const router=express.Router()


//braintree 
const braintreeController = require('../app/controllers/braintreeController')

 //order
 const order = require('../app/controllers/order')
 const {orderById} = require('../app/middlewares/order')


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
 router.get('/orders/by/user/:userId',isLogin, user.purchaseHistory)
 

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



//order routes
router.post('/order/create/:userId',isLogin,addOrderToUserHistory,decreaseQuantity, order.create)
router.get('/order/list/:userId',isLogin,isAdmin, order.listOrders)
router.get('/order/status-values/:userId',isLogin,isAdmin, order.getStatusValues)
router.put('/order/:orderId/status/:userId',isLogin,isAdmin, order.updateOrderStatus)





//braintree payment process 
router.get('/braintree/getToken/:userId',isLogin,braintreeController.generateToken)
router.post('/braintree/payment/:userId',isLogin,braintreeController.processPayment)
//ID
router.param('userId', userById);
router.param('productId',productById)
router.param('categoryId',categoryById)
router.param('orderId',orderById)
 
module.exports=router