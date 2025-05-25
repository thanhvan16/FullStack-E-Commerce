import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import "./slicer.css";
import formatPrice from "../../helpers/formatPrice";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Mũi tên next
const SampleNextArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow next" onClick={onClick}>
      <FaArrowRight size={24} />
    </div>
  );
};

// Mũi tên prev
const SamplePrevArrow = ({ onClick }) => {
  return (
    <div className="custom-arrow prev" onClick={onClick}>
      <FaArrowLeft size={24} />
    </div>
  );
};

function ProductSlider({ products }) {
  const navigate = useNavigate();
  const handleOnclickBuy = (id) => {
    navigate(`/products/${id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />, // Mũi tên next
    prevArrow: <SamplePrevArrow />, // Mũi tên prev
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-3 fs-4">SẢN PHẨM LIÊN QUAN</h2>
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item._id} className="px-3">
            <div className=" p-5 bg-white  ">
              <div className="position-relative">
                 {item.discount <=20 &&(
                  <span className="badge bg-danger position-absolute top-0 start-0">
                    Hàng mới về
                  </span>
                 )}
                {item.discount > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0px",
                      right: "-10px",
                      backgroundColor: "#dc3545",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    -{item.discount}%
                  </div>
                )}
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                  }}
                >
                  <img
                    className="card-img-top p-3"
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "cover",
                    }}
                  />
                </div>
              </div>
              <div className="card-body text-center">
                <h5
                  className="card-title fs-6 py-2"
                  style={{ maxWidth: "100%" }}
                >
                  {item.title}
                </h5>
                <p className="text-danger fw-bold">{formatPrice(item.price)} đ</p>
                <button
                  className="btn btn-dark"
                  onClick={() => handleOnclickBuy(item?._id)}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default ProductSlider;
