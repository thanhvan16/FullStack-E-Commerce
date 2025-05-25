import { NavLink, useNavigate } from "react-router-dom";
import { SiNike } from "react-icons/si";
import { SiAdidas } from "react-icons/si";
import { SiPuma } from "react-icons/si";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryApi from "../common";
import { useState } from "react";
import formatPrice from "../helpers/formatPrice";
function Main() {
  // const navigate = useNavigate();
  // const handleOnclick = (id) => {
  //   navigate(`/products/${id}`);
  //   window.scrollTo(0, 0);
  // };
  const [allProduct, setAllProduct] = useState([]);
  const fetchAllProduct = async () => {
    const dataResponse = await fetch(SummaryApi.getProduct.url);
    const dataApi = await dataResponse.json();
    setAllProduct(dataApi?.data || []);
    console.log(dataApi?.data)
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);

  const filterProduct = allProduct.filter((product) => product.discount <= 20);
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://www.prodirectsport.com/-/media/prodirect/project/en/soccer/billboards/hero-banner/boots/nike/hero-banner-d-nike-chromatic-pack-050325.jpg"
            alt="Card"
            height={500}
          />
          <div className="card-img-overlay d-flex flex-row justify-content-between align-items-end p-4">
            <div className="card-title d-flex flex-column justify-content-between">
              <div className="d-flex justify-content-space-between  align-items-center gap-4">
                <SiNike className="fs-1" />
                <SiAdidas className="fs-1" />
                <SiPuma className="fs-1" />
              </div>
              {/* <div className="fs-2 fw-bold  text-dark mt-2 ">Giày đá bóng sân cỏ nhân tạo chính hãng </div> */}
            </div>
            {/* <a href="/shop" className="btn btn-primary btn-lg mt-2">Mua sắm </a> */}
            <NavLink to="/products" className="btn btn-outline-dark m-2 ">
              Mua sắm ngay <i className="fa fa-arrow-right"></i>
            </NavLink>
          </div>
        </div>
        <div className="text-center p-4 fw-bold fs-2">Hàng mới về</div>
        <hr></hr>
      </div>
      <div className="container mt-4 mb-4">
        <Swiper
          slidesPerView={4} // Hiển thị 4 sản phẩm mỗi lần
          spaceBetween={20} // Khoảng cách giữa các sản phẩm
          loop={true} // Lặp vô hạn
          navigation={true} // Hiển thị nút điều hướng
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
        >
          {filterProduct.map((product) => (
            <SwiperSlide key={product?._id}>
              <div className="card shadow-lg">
                <div className="position-relative">
                  <span className="badge bg-danger position-absolute top-0 start-0">
                    Hàng mới về
                  </span>
                  {product.discount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "0px",
                        right: "0px",
                        backgroundColor: "#dc3545",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      -{product?.discount}%
                    </div>
                  )}
                  <div style={{ aspectRatio: "4/3" }}>
                    <img
                      src={product?.image}
                      className="card-img-top"
                      alt={product?.title}
                      style={{ objectFit: "cover", width: "100%" }}
                    />
                  </div>
                </div>
                <div className="card-body text-center">
                  <h6 className="card-title mb-5" style={{ fontSize: "12px" }}>
                    {product?.title}
                  </h6>
                  <p className="fw-medium text-danger">{formatPrice(product?.price)} đ</p>
                  <NavLink  to={`products/${product._id}`}>
                  <button
                    className="btn btn-dark"
                  >
                    Mua ngay
                  </button>
                  </NavLink>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
export default Main;
