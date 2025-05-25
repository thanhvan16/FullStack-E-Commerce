import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { addProduct } from "../../redux/action/Cart";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import formatPrice from "../../helpers/formatPrice";
import addToCart from "../Cart/addToCart";
import Context from "../../context";
import React, { useContext } from "react";

function ProductDetailItem({ product }) {
  const item = product;
  const sizes = item?.size || [];
  const [selectedSize, setSelectedSize] = useState(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddtoCart = async (e, id, size) => {
    if (!selectedSize) {
      toast.error("Vui lòng chọn size trước khi thêm vào giỏ hàng!");
      return;
    }
    await addToCart(e, id, size);
    fetchUserAddToCart();
  };

  return (
    <>
      <Toaster />
      <div className="container my-4">
        <div className="row bg-white rounded-3 shadow-sm p-3">
          <div className="col-md-6 col-sm-12 position-relative">
            <div className="product-image-container p-3 bg-light rounded-3 text-center">
              {product.discount <= 20 && (
                <span className="badge bg-danger position-absolute top-0 start-0 m-2 py-1 px-2">
                  Hàng mới về
                </span>
              )}
              {product.discount > 0 && (
                <div className="discount-badge">
                  -{product?.discount}%
                </div>
              )}
              <img
                className="img-fluid hover-zoom"
                src={item.image}
                alt={item.title}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  transition: "transform 0.3s ease"
                }}
              />
            </div>
          </div>
          
          <div className="col-md-6 col-sm-12">
            <div className="product-info px-3">
              <h1 className="product-title mb-2">{item.title}</h1>
              
              <div className="ratings mb-2">
                {[...Array(5)].map((_, index) => (
                  <i key={index} className="fa fa-star text-warning me-1"></i>
                ))}
              </div>
              
              <div className="category-badge mb-2">
                <span className="text-muted">{item.category}</span>
              </div>
              
              <div className="price-container mb-3">
                <div className="original-price">
                  <span className="text-decoration-line-through text-muted">
                    {formatPrice(item?.price)}đ
                  </span>
                </div>
                <div className="sale-price">
                  <span className="text-danger fw-bold fs-5">
                    {formatPrice(
                      Math.round((item.price * (100 - item.discount)) / 100 / 1000) * 1000
                    )}đ
                  </span>
                </div>
              </div>
              
              <div className="guarantee-text mb-3">
                <div className="alert alert-danger py-2">
                  <i className="fas fa-shield-alt me-2"></i>
                  CAM KẾT SẢN PHẨM CHÍNH HÃNG 100%. ĐƯỢC BỒI HOÀN GẤP 10 LẦN NẾU KHÔNG PHẢI CHÍNH HÃNG
                </div>
              </div>
              
              <div className="size-selection mb-3">
                <h6 className="mb-2">Chọn size:</h6>
                <div className="d-flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="action-buttons">
                <button
                  className="btn btn-danger btn-lg me-3"
                  onClick={(e) => handleAddtoCart(e, product._id, selectedSize)}
                >
                  <i className="fas fa-shopping-cart me-2"></i>
                  Thêm vào giỏ hàng
                </button>
                <NavLink to="/cart">
                  <button className="btn btn-dark btn-lg">
                    <i className="fas fa-arrow-right me-2"></i>
                    Tới giỏ hàng
                  </button>
                </NavLink>
              </div>
            </div>
          </div>
          
          <div className="col-12 mt-4">
            <div className="product-description">
              <h5 className="description-title mb-3">
                <i className="fas fa-info-circle me-2"></i>
                Mô tả sản phẩm
              </h5>
              <div className="description-content p-3 bg-light rounded-3">
                {item.description}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .product-image-container {
          overflow: hidden;
        }
        
        .hover-zoom:hover {
          transform: scale(1.05);
        }
        
        .discount-badge {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          background-color: #dc3545;
          color: white;
          padding: 0.4rem 0.8rem;
          border-radius: 0.4rem;
          font-weight: bold;
          z-index: 1;
        }
        
        .product-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .size-btn {
          padding: 0.4rem 1.2rem;
          border: 2px solid #dee2e6;
          background: white;
          border-radius: 0.4rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .size-btn:hover {
          border-color: #0d6efd;
          color: #0d6efd;
        }
        
        .size-btn.selected {
          background: #0d6efd;
          color: white;
          border-color: #0d6efd;
        }
        
        .description-title {
          position: relative;
          padding-bottom: 1rem;
          border-bottom: 2px solid #dee2e6;
        }
        
        .description-content {
          line-height: 1.8;
          color: #666;
        }
        
        .action-buttons .btn {
          padding: 0.6rem 1.2rem;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

export default ProductDetailItem;
