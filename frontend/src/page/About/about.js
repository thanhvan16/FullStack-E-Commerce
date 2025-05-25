import { NavLink } from "react-router-dom";
import { TbPlayFootball } from "react-icons/tb";
import { FaShieldAlt, FaTrophy, FaUsers, FaStore } from 'react-icons/fa';

function About() {
  return (
    <>
      {/* Hero Section */}
      <div className="position-relative">
        <div 
          className="w-100" 
          style={{
            height: "400px",
            backgroundImage: "url('https://images.unsplash.com/photo-1459865264687-595d652de67e?q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative"
          }}
        >
          <div 
            className="position-absolute w-100 h-100" 
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              top: 0,
              left: 0
            }}
          />
          <div className="container position-relative h-100">
            <div className="row h-100 align-items-center">
              <div className="col-lg-8">
                <h1 className="text-white fw-bold mb-3">
                  Chào mừng đến với <span className="text-danger">t-sport</span>
                </h1>
                <p className="text-white fs-5 mb-4">
                  Nơi cung cấp những đôi giày đá bóng chất lượng hàng đầu tại Việt Nam
                </p>
                <NavLink 
                  to="/products" 
                  className="btn btn-danger px-4 py-2 rounded-pill"
                >
                  Khám phá ngay
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-3">
            <div className="p-3 bg-white rounded-3 shadow-sm text-center">
              <FaUsers className="text-danger mb-2" size={30} />
              <h4 className="fw-bold mb-1">5000+</h4>
              <p className="text-muted mb-0">Khách hàng tin tưởng</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white rounded-3 shadow-sm text-center">
              <FaStore className="text-primary  mb-2" size={30} />
              <h4 className="fw-bold mb-1">10+</h4>
              <p className="text-muted mb-0">Chi nhánh toàn quốc</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white rounded-3 shadow-sm text-center">
              <FaTrophy className="text-warning mb-2" size={30} />
              <h4 className="fw-bold mb-1">50+</h4>
              <p className="text-muted mb-0">Giải thưởng</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="p-3 bg-white rounded-3 shadow-sm text-center">
              <FaShieldAlt className="text-success  mb-2" size={30} />
              <h4 className="fw-bold mb-1">100%</h4>
              <p className="text-muted mb-0">Sản phẩm chính hãng</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                className="w-100 rounded-3 shadow-sm"
                src="https://media.bongda.com.vn/files/duong.nguyen/2018/05/29/5-1314.jpg"
                alt="About Shop"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="col-lg-6">
              <div className="ps-lg-4">
                <h6 className="text-danger text-uppercase fw-bold mb-3">
                  Về chúng tôi
                </h6>
                <h2 className="fw-bold mb-4">
                  <TbPlayFootball className="me-2" />
                  <span className="text-danger">t-sport</span>
                </h2>
                <p className="text-secondary mb-4" style={{ lineHeight: "1.8" }}>
                  t-sport ra đời từ năm 2022, là cửa hàng chuyên cung cấp giày đá bóng sân cỏ nhân tạo chính hãng, uy tín tại Việt Nam. Chúng tôi đã và đang nỗ lực nhằm đem lại cho khách hàng những trải nghiệm tốt nhất về chất lượng dịch vụ, cũng như đưa ra những tư vấn tận tâm để khách hàng có thể chọn lựa được cho mình những đôi giày đá bóng phù hợp nhất.
                </p>
                <div className="row g-3 mb-4">
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-check-circle text-danger me-2"></i>
                      <span>Sản phẩm chính hãng</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-check-circle text-danger me-2"></i>
                      <span>Tư vấn chuyên nghiệp</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-check-circle text-danger me-2"></i>
                      <span>Bảo hành uy tín</span>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex align-items-center">
                      <i className="fa fa-check-circle text-danger me-2"></i>
                      <span>Giao hàng toàn quốc</span>
                    </div>
                  </div>
                </div>
                <NavLink
                  to="/products"
                  className="btn btn-outline-danger px-4 py-2 rounded-pill"
                >
                  Xem sản phẩm
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-danger rounded-circle flex-shrink-0 me-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-shield-alt text-white"></i>
                </div>
                <h5 className="fw-bold mb-0">Chính hãng 100%</h5>
              </div>
              <p className="text-secondary mb-0">
                Cam kết cung cấp sản phẩm chính hãng từ các thương hiệu nổi tiếng với đầy đủ tem nhãn và giấy tờ bảo hành
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-danger rounded-circle flex-shrink-0 me-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-headset text-white"></i>
                </div>
                <h5 className="fw-bold mb-0">Tư vấn tận tâm</h5>
              </div>
              <p className="text-secondary mb-0">
                Đội ngũ nhân viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ bạn chọn được sản phẩm phù hợp nhất
              </p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="p-4 bg-white rounded-3 shadow-sm h-100">
              <div className="d-flex align-items-center mb-3">
                <div
                  className="d-flex align-items-center justify-content-center bg-danger rounded-circle flex-shrink-0 me-3"
                  style={{ width: "50px", height: "50px" }}
                >
                  <i className="fa fa-truck text-white"></i>
                </div>
                <h5 className="fw-bold mb-0">Giao hàng nhanh</h5>
              </div>
              <p className="text-secondary mb-0">
                Dịch vụ giao hàng toàn quốc nhanh chóng, đảm bảo sản phẩm đến tay khách hàng an toàn và đúng hẹn
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
