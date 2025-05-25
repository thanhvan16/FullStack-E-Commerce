import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LayoutDefault from "./Layout/LayoutDefault";
import Products from "./page/Products/products";
import About from "./page/About/about";
import Contact from "./page/Contact/contact";
import Login from "./page/Login/login";
import Register from "./page/Register/register";
import Home from "./page/Home/home";
import Cart from "./page/Cart/cart";
import Checkout from "./page/Checkout/checkout"
import ProductDetail from "./page/ProductDetail/productDetail"
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Admin from './Admin/admin'
import ProductsAdmin from "./Admin/ProductAdmin/ProductsAdmin";
import Order from "./Admin/Order/Order";
import Category from "./Admin/Category/category";
import Users from "./Admin/Users/Users";
import Dashboard from "./Admin/Dashboard/dashboard";
import ScrollToTop from "./Scroll/scrolltoTop";
import { ToastContainer } from 'react-toastify';
import { useEffect } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { setUserDetails } from "./store/userSlice";
import Cancel from "./page/Cancel/cancel";
import OrderView from "./page/Order/order";
import Verify from "./page/Verify/Verify";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCartProduct.url, {
      method: SummaryApi.countAddToCartProduct.method,
      credentials: 'include'
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider value={{
        fetchUserDetails,
        fetchUserAddToCart,
        cartProductCount
      }}>
        <ToastContainer />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LayoutDefault />}>
            <Route path="/" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="search" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="cancel" element={<Cancel />} />
            <Route path="order" element={<OrderView />} />
            <Route path="verify" element={<Verify />} />
          </Route>
          <Route path="/admin" element={<Admin />}>
            <Route path="productsAdmin" element={<ProductsAdmin />} />
            <Route path="orders" element={<Order />} />
            <Route path="category" element={<Category />} />
            <Route path="users" element={<Users />} />
            <Route path="" element={<Dashboard />} />
          </Route>
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
