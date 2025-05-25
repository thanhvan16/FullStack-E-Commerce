const express = require('express')

const router= express.Router()


const userSignUpController = require('../controller/User/userSignUp')
const userSignInController=require('../controller/User/userSignIn')
const userDetailsController=require('../controller/User/userDetails')
const userLogoutController= require('../controller/User/userLogout')
const authToken=require('../middleware/authToken')
const allUserController=require('../controller/User/allUsers')
const updateUserController = require('../controller/User/updateUser')
const deleteUserController = require('../controller/User/deleteUser')
const addProductController= require('../controller/Products/addProduct')
const getProductController = require('../controller/Products/getProduct')
const productDetailController = require('../controller/Products/productDetail')
const editProductController = require('../controller/Products/editProduct')
const addCategoryProductController = require('../controller/Products/addCategory')
const getCategoryController = require('../controller/Products/getCategory')
const deleteCategoryController = require('../controller/Products/deleteCategory')
const deleteProductController = require('../controller/Products/deleteProduct')
const addToCartContoller = require('../controller/User/addToCartController')
const countAddToCartProduct = require('../controller/User/countAddToCartProduct')
const addToCartViewProductController = require('../controller/User/addToCartProductView')
const updateAddToCartProduct = require('../controller/User/updateAddToCartProduct')
const deleteAddToCartController = require('../controller/User/deleteAddToCart')
const seachProductController = require('../controller/Products/searchProduct')
const filterProductController = require('../controller/Products/filterProduct')
const getPaginatedProductController = require('../controller/Products/getPaginatedProducts')
const authTokenAdmin = require('../middleware/authTokenAdmin')
const placeOrderController = require('../controller/Order/placeOrderController')
const verifyOrderController = require('../controller/Order/verifyOrder')
const userOrderController = require('../controller/Order/userOrders')
const allOrderController = require('../controller/Order/allOrder')
const updateOrderController = require('../controller/Order/updateOrder')
const clearCartController = require('../controller/User/clearCart')

// User
router.post("/register",userSignUpController)
router.post("/login",userSignInController)
router.get("/user-details",authToken,userDetailsController)
router.get("/logout",authToken,userLogoutController)



// Admin 
router.get("/allUser",authTokenAdmin,allUserController)
router.post("/updateUser",authTokenAdmin, updateUserController)
router.delete('/deleteUser', authTokenAdmin, deleteUserController)

//product
router.post("/addProduct",authTokenAdmin,addProductController)
router.get("/getProduct", getProductController)
router.post("/productDetail",productDetailController)
router.post("/editProduct", authTokenAdmin,editProductController)
router.post("/addCategory",authTokenAdmin,addCategoryProductController)
router.get("/getCategory", getCategoryController)
router.delete("/deleteCategory",authTokenAdmin, deleteCategoryController)
router.delete("/deleteProduct", authTokenAdmin,deleteProductController)
router.get("/searchProduct", seachProductController)
router.get("/filterProduct", filterProductController)
router.get("/products", getPaginatedProductController)

// cart
router.post("/addtocart",authToken,addToCartContoller)
router.get("/countAddToCartProduct",authToken, countAddToCartProduct)
router.get("/viewcart",authToken,addToCartViewProductController )
router.post("/updatecart",authToken, updateAddToCartProduct)
router.delete("/deleteProductCart",authToken, deleteAddToCartController)
router.delete("/clearCart",authToken,clearCartController)


// payment and order
router.post("/placeOrder",authToken,placeOrderController)
router.post("/verifyOrder", authToken, verifyOrderController)
router.post("/userOrder", authToken, userOrderController)
router.get("/allOrder", authTokenAdmin,allOrderController)
router.post("/updateOrder", authTokenAdmin, updateOrderController)

module.exports= router