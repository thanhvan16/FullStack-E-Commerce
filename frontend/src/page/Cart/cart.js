import React, { useContext } from "react";
import Context from "../../context";
import CartList from "./CartList";
import EmptyCart from "./EmptyCart";
import "../../Css/cart.css";

function Cart() {
  const { cartProductCount } = useContext(Context);
  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Giỏ hàng của bạn</h1>
          <span className="cart-count">{cartProductCount} sản phẩm</span>
        </div>
        <div className="cart-content">
          {cartProductCount > 0 ? <CartList /> : <EmptyCart />}
        </div>
      </div>
    </div>
  );
}

export default Cart;