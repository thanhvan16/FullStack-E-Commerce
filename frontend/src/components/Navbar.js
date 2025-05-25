import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TbPlayFootball } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Context from "../context";
import React, { useContext } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const { cartProductCount } = useContext(Context);

  // Tự đóng khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    const dataResponse = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      dispatch(setUserDetails(dataApi.data));
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  console.log(user);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
        <div className="container">
          <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
            {" "}
            <TbPlayFootball /> <span style={{ color: "red" }}>t-sport</span>
          </NavLink>
          <button
            className="navbar-toggler mx-2"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto my-2 text-center ">
              <li className="nav-item">
                <NavLink className="nav-link " to="/">
                  Trang chủ{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/products">
                  Sản phẩm{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  Giới thiệu{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact">
                  Liên hệ{" "}
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center buttons text-center">
              {user?._id ? (
                <>
                  <NavLink to="/cart" className="btn btn-outline-warning m-2">
                    <i className="fa fa-cart-shopping mr-1"></i> Giỏ hàng (
                    {cartProductCount > 0 ? cartProductCount : 0}){" "}
                  </NavLink>
                  {/* <button
                    onClick={handleLogout}
                    className="btn btn-outline-dark m-2"
                  >
                    <i className="fa fa-arrow-right-from-bracket mr-1"></i> Đăng
                    xuất{" "}
                  </button> */}
                  <div className="position-relative m-2" ref={dropdownRef}>
                    <div className="position-relative">
                      {/* Phần tiêu đề "Tài khoản" có thể click */}
                      <div
                        className="d-flex align-items-center cursor-pointer px-3 py-2 border rounded-3 bg-light"
                        onClick={() => setOpenDropdown((prev) => !prev)}
                        style={{ userSelect: "none" }}
                      >
                        <i className="fa-regular fa-circle-user me-2 fs-5 text-primary"></i>
                        <span className="fw-semibold">Tài khoản</span>
                        <i className="fa fa-chevron-down ms-2 text-muted small"></i>
                      </div>

                      {/* Dropdown list bên dưới */}
                      {openDropdown && (
                        <ul
                          className="bg-white shadow border rounded-3 py-2 list-unstyled mt-2 mb-0"
                          style={{
                            position: "absolute",
                            top: "100%",
                            right: 0,
                            minWidth: "150px",
                            zIndex: 999,
                          }}
                        >
                          <li>
                            <NavLink
                              to="/change-password"
                              className="d-flex align-items-center gap-2 px-3 py-2 text-decoration-none text-dark custom-hover"
                              onClick={() => setOpenDropdown(false)}
                            >
                              <i
                                className="fa fa-key"
                                style={{ color: "#f39c12" }}
                              ></i>
                              <span>Đổi mật khẩu</span>
                            </NavLink>
                          </li>
                           <hr className="my-1" />
                          <li>
                            <NavLink
                              to="/order"
                              className="d-flex align-items-center gap-2 px-3 py-2 text-decoration-none text-dark custom-hover"
                              onClick={() => setOpenDropdown(false)}
                            >
                              <i
                                className="fa fa-bag-shopping"
                                style={{ color: "#27ae60" }}
                              ></i>
                              <span>Đơn hàng</span>
                            </NavLink>
                          </li>
                          <hr className="my-1" />
                          <li>
                            <button
                              onClick={handleLogout}
                              className="d-flex align-items-center gap-2 px-3 py-2 w-100 text-decoration-none text-danger bg-transparent border-0 custom-hover"
                            >
                              <i className="fa fa-sign-out-alt"></i>
                              <span>Đăng xuất</span>
                            </button>
                          </li>
                        </ul>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <NavLink to="/login" className="btn btn-outline-dark m-2">
                    <i className="fa fa-sign-in-alt mr-1"></i> Đăng nhập{" "}
                  </NavLink>
                  <NavLink to="/register" className="btn btn-outline-dark m-2">
                    <i className="fa fa-user-plus mr-1 "></i> Đăng kí{" "}
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
