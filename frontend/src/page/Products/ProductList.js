import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { addProduct } from "../../redux/action/Cart";
import { useNavigate } from "react-router-dom";
import SummaryApi from "../../common";
import formatPrice from "../../helpers/formatPrice";

function ProductList() {
  const navigate = useNavigate();
  const [allProduct, setAllProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [filter, setFilter] = useState(allProduct);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("q");
  const categoryParam = queryParams.get("category");
  const page = parseInt(queryParams.get("page")) || 1;
  // all product
  const fetchAllProduct = async () => {
    const dataResponse = await fetch(SummaryApi.getProduct.url);
    const dataApi = await dataResponse.json();
    setAllProduct(dataApi?.data || []);
    setFilter(dataApi?.data || []);
  };

  // all category
  const fetchAllCategory = async () => {
    const dataResponse = await fetch(SummaryApi.getCategory.url);
    const dataApi = await dataResponse.json();
    setCategory(dataApi?.data || []);
  };

  // filter
  const handleFilter = (category) => {
    navigate(`/products?category=${category}`);
  };
  const fetchFilterProduct = async () => {
    const response = await fetch(
      SummaryApi.filterProduct.url + "?category=" + categoryParam
    );
    const dataResponse = await response.json();
    setFilter(dataResponse?.data);
  };

  // search
  const handleSearch = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/products");
    }
  };
  const fetchProduct = async () => {
    const response = await fetch(
      SummaryApi.searchProduct.url + "?q=" + keyword
    );
    const dataResponse = await response.json();
    setFilter(dataResponse?.data);
  };

  // page
  const fetchPaginatedProduct = async () => {
    const response = await fetch(
      SummaryApi.getPaginatedProduct.url +'?page='+page+'&limit=9'
    );
    const dataResponse = await response.json();
    setFilter(dataResponse?.data || []);
    setTotalPages(dataResponse?.totalPages);
  };

  useEffect(() => {
    fetchAllCategory(); 
    if (keyword) {
      fetchProduct();
    } else if (categoryParam) {
      fetchFilterProduct();
    } else if (page && !keyword && !categoryParam) {
      fetchPaginatedProduct();
    } else {
      fetchAllProduct();
    }
  }, [keyword, categoryParam, page]);
  return (
    <div className="bg-light min-vh-100">
      <div className="container py-5">
        <div className="row g-4">
          {/* Sidebar - Category List */}
          <div className="col-md-3">
            <div
              className="bg-white rounded-3 p-3 shadow-sm position-sticky"
              style={{ top: "100px" }}
            >
              <h5 className="mb-3 text-dark fw-bold">Danh mục sản phẩm</h5>
              <div className="d-flex flex-column gap-2">
                <button
                  onClick={() => navigate("/products")}
                  className="btn btn-outline-dark w-100 text-start hover-scale"
                  style={{ transition: 'all 0.2s ease' }}
                >
                  <i className="fas fa-list me-2"></i>
                  Tất cả sản phẩm
                </button>
                {category.map((cate) => (
                  <button
                    key={cate._id}
                    onClick={() => handleFilter(cate?.name)}
                    className="btn btn-outline-dark w-100 text-start hover-scale"
                    style={{ transition: 'all 0.2s ease' }}
                  >
                    <i className="fas fa-tag me-2"></i>
                    {cate?.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-md-9">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="input-group">
                <span className="input-group-text bg-dark text-white border-0">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control border-0 py-3 shadow-sm"
                  placeholder="Tìm kiếm sản phẩm..."
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* Product Grid */}
            <div className="row g-4">
              {filter.length > 0 ? (
                filter.map((product) => (
                  <div
                    key={product._id}
                    className="col-lg-4 col-md-6 col-sm-12"
                  >
                    <div 
                      className="card h-100 border-0 shadow-sm product-card"
                      style={{
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                      }}
                    >
                      <div className="position-relative">
                        {product.discount > 0 && (
                          <div
                            className="badge bg-danger position-absolute"
                            style={{
                              top: "10px",
                              right: "10px",
                              zIndex: 2,
                            }}
                          >
                            -{product.discount}%
                          </div>
                        )}
                        <div 
                          className="product-img-wrapper" 
                          style={{ 
                            position: 'relative',
                            paddingTop: '75%', // 4:3 aspect ratio
                            overflow: 'hidden'
                          }}
                        >
                          <img
                            className="card-img-top p-3"
                            src={product.image}
                            alt={product.title}
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '100%',
                              height: '100%',
                              objectFit: "contain",
                              transition: 'transform 0.3s ease',
                            }}
                          />
                        </div>
                      </div>
                      <div className="card-body text-center">
                        <h5 className="card-title text-truncate mb-3" style={{ fontSize: '0.9rem' }}>{product.title}</h5>
                        <div className="d-flex justify-content-center align-items-center gap-2 mb-3">
                          <span 
                            className="text-decoration-line-through text-muted"
                            style={{ fontSize: '0.8rem' }}
                          >
                            {formatPrice(product.price)}đ
                          </span>
                          <span 
                            className="text-danger fw-bold"
                            style={{ fontSize: '0.95rem' }}
                          >
                            {formatPrice(
                              Math.round(
                                (product.price * (100 - product.discount)) /
                                  100 /
                                  1000
                              ) * 1000
                            )}
                            đ
                          </span>
                        </div>
                        <NavLink 
                          to={`/products/${product._id}`}
                          className="text-decoration-none"
                        >
                          <button 
                            className="btn btn-dark w-100 py-2"
                            style={{
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <i className="fas fa-shopping-cart me-2"></i>
                            Mua ngay
                          </button>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <i className="fas fa-search fa-3x text-muted mb-3"></i>
                  <p className="text-muted fs-5">Không tìm thấy sản phẩm nào!</p>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-5">
              <div className="btn-group">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => navigate(`/products?page=${i + 1}`)}
                    className={`btn ${
                      i + 1 === page 
                        ? "btn-dark" 
                        : "btn-outline-dark"
                    }`}
                    style={{
                      minWidth: '40px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
