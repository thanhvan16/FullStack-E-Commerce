import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SummaryApi from "../../common";
import { NavLink } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { useContext } from "react";
import { useSelector } from "react-redux";
import Context from "../../context";
const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const user = useSelector((state) => state?.user?.user);
  const userId = user?._id;

  const { fetchUserAddToCart } = useContext(Context);

  const verifyPayment = async () => {
    const dataApi = await fetch(SummaryApi.verifyOrder.url, {
      method: SummaryApi.verifyOrder.method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        success: success,
        orderId: orderId,
      }),
    });
    const dataResponse = await dataApi.json();
    if (success == "true") {
      await fetch(SummaryApi.clearCart.url, {
        method: SummaryApi.clearCart.method,
        credentials: "include",
      });
      fetchUserAddToCart();
    }
  };
  useEffect(() => {
    verifyPayment();
  });
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 py-5 mb-9  text-center">
            {success === "true" ? (
             <>
               <h4 className="p-3 display-5 text-success">
                <FaRegCheckCircle style={{ color: "green" }} /> Đặt hàng thành
                công!
              </h4>
              <NavLink to="/order" className="btn btn-outline-dark mx-4">
                  <i className="fa fa-arrow-right"></i> Xem đơn hàng
              </NavLink>
             </>
              
            ) : (
              <>
                <h4 className="p-3 display-5 text-danger">
                  <FaTimesCircle style={{ color: "red" }} /> Đặt hàng thất bại
                </h4>
                <NavLink to="/products" className="btn btn-outline-dark mx-4">
                  <i className="fa fa-arrow-left"></i> Tiếp tục mua hàng
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Verify;
