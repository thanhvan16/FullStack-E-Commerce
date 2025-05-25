const backendDomin=process.env.REACT_APP_BACKEND_URL
const SummaryApi={
    signUp:{
        url: `${backendDomin}/api/register`,
        method:"post"
    },
    signIn:{
        url: `${backendDomin}/api/login`,
        method:"post"

    },
    current_user:{
        url: `${backendDomin}/api/user-details`,
        method:"get"
    },
    logout_user:{
        url: `${backendDomin}/api/logout`,
        method:"get"
    },
    allUser:{
        url: `${backendDomin}/api/allUser`,
        method:"get"
    },
    updateUser:{
        url: `${backendDomin}/api/updateUser`,
        method:"post"
    },
    deleteUser:{
        url: `${backendDomin}/api/deleteUser`,
        method:"delete"
    },
    addProduct:{
        url: `${backendDomin}/api/addProduct`,
        method:"post"
    },
    getProduct:{
        url: `${backendDomin}/api/getProduct`,
        method:"get"

    },
    productDetail:{
        url: `${backendDomin}/api/productDetail`,
        method:"post"

    },
    editProduct:{
        url: `${backendDomin}/api/editProduct`,
        method:"post"
    },
    addCategory:{
        url: `${backendDomin}/api/addCategory`,
        method:"post"
    },
    getCategory:{
        url: `${backendDomin}/api/getCategory`,
        method:"get"
    },
    deleteCategoy:{
        url: `${backendDomin}/api/deleteCategory`,
        method:"delete"
    },
    deleteProduct:{
        url: `${backendDomin}/api/deleteProduct`,
        method:"delete"
    },
    addToCart:{
        url: `${backendDomin}/api/addtocart`,
        method:"post"
    },
    countAddToCartProduct:{
        url: `${backendDomin}/api/countAddToCartProduct`,
        method:"get"
    },
    addToCartProductView:{
        url: `${backendDomin}/api/viewcart`,
        method:"get"
    },
    updateAddToCartProduct:{
        url: `${backendDomin}/api/updatecart`,
        method:"post"
    },
    deleteAddToCartProduct:{
        url: `${backendDomin}/api/deleteProductCart`,
        method:"delete"
    },
    searchProduct:{
        url: `${backendDomin}/api/searchProduct`,
        method:"get"
    },
    filterProduct:{
        url: `${backendDomin}/api/filterProduct`,
        method:"get"
    },
    getPaginatedProduct:{
        url: `${backendDomin}/api/products`,
        method:"get"
    },
    payment:{
        url: `${backendDomin}/api/checkout`,
        method:"post"
    },
    placeOrder:{
        url: `${backendDomin}/api/placeOrder`,
        method:"post"
    },
    verifyOrder:{
        url: `${backendDomin}/api/verifyOrder`,
        method:"post"
    },
    userOrder:{
        url: `${backendDomin}/api/userOrder`,
        method:"post"
    },
    allOrder:{
        url: `${backendDomin}/api/allOrder`,
        method:"get"
    },
    updateOrder:{
        url: `${backendDomin}/api/updateOrder`,
        method: "post"
    },
    clearCart:{
        url: `${backendDomin}/api/clearCart`,
        method: "delete"
    }
}
export default SummaryApi;