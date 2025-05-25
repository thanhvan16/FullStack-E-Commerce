function Contact() {
  return (
    <>
      <div className="container-fluid py-5" style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)" }}>
        <div className="container py-4">
          <div className="row mb-5">
            <div className="col-12 text-center">
              <h3 className="display-4 fw-bold text-dark mb-3" style={{ letterSpacing: "1px" }}>
                Liên hệ với chúng tôi
              </h3>
              <hr className="w-25 mx-auto" style={{ height: "3px", opacity: "1", background: "linear-gradient(90deg, #ffd700, #ff8c00)" }} />
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="bg-white p-5 rounded-3 shadow-lg" style={{ transition: "transform 0.3s ease" }}>
                <p className="mb-5 fs-5 text-danger fw-semibold text-center" style={{ lineHeight: "1.6" }}>
                  Quý khách hàng có thể liên hệ cửa hàng thông qua các kênh sau để
                  được tư vấn và hỗ trợ nhanh nhất!
                </p>

                {/* Contact Info Cards */}
                <div className="row g-4">
                  {/* Địa chỉ */}
                  <div className="col-md-6">
                    <div className="contact-card p-4 rounded-3 h-100" 
                      style={{ 
                        background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        border: "1px solid #e9ecef"
                      }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper p-3 rounded-circle bg-warning bg-opacity-10">
                          <i className="fa fa-map-marker-alt text-warning fs-4"></i>
                        </div>
                        <div>
                          <h5 className="mb-2 fw-bold text-dark">Địa chỉ</h5>
                          <p className="mb-0 text-secondary">Mộ Lao, Hà Đông, Hà Nội</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hotline */}
                  <div className="col-md-6">
                    <div className="contact-card p-4 rounded-3 h-100" 
                      style={{ 
                        background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        border: "1px solid #e9ecef"
                      }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper p-3 rounded-circle bg-success bg-opacity-10">
                          <i className="fa fa-phone-alt text-success fs-4"></i>
                        </div>
                        <div>
                          <h5 className="mb-2 fw-bold text-dark">Hotline</h5>
                          <p className="mb-0 text-secondary">+84 329140358</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div className="col-md-6">
                    <div className="contact-card p-4 rounded-3 h-100" 
                      style={{ 
                        background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        border: "1px solid #e9ecef"
                      }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper p-3 rounded-circle bg-primary bg-opacity-10">
                          <i className="fa-brands fa-square-facebook text-primary fs-4"></i>
                        </div>
                        <div>
                          <h5 className="mb-2 fw-bold text-dark">Facebook</h5>
                          <p className="mb-0 text-secondary">Tsport</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="col-md-6">
                    <div className="contact-card p-4 rounded-3 h-100" 
                      style={{ 
                        background: "linear-gradient(to right, #ffffff, #f8f9fa)",
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        border: "1px solid #e9ecef"
                      }}>
                      <div className="d-flex align-items-center gap-3">
                        <div className="icon-wrapper p-3 rounded-circle bg-danger bg-opacity-10">
                          <i className="fa-brands fa-instagram text-danger fs-4"></i>
                        </div>
                        <div>
                          <h5 className="mb-2 fw-bold text-dark">Instagram</h5>
                          <p className="mb-0 text-secondary">tsport16</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Địa chỉ chi tiết */}
          <div className="mt-5 mb-4 text-center">
            <h4 className="fs-4 fw-bold text-dark d-inline-flex align-items-center gap-2">
              <i className="fa fa-map-location-dot text-warning fs-4"></i>
              Địa chỉ chi tiết
            </h4>
          </div>

          {/* Google Map Section */}
          <div className="map-container rounded-3 shadow-lg overflow-hidden" style={{ border: "8px solid white" }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7450.523661963238!2d105.78010094142665!3d20.98213902262189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accdab6f3ae7%3A0x60ddfd85d24b0c52!2zTeG7mSBMYW8sIEjDoCDEkMO0bmcsIEjDoCBO4buZaSwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1742232491494!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map"
            ></iframe>
          </div>
        </div>
      </div>

      <style>
        {`
          .contact-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            border-color: transparent !important;
          }
          .icon-wrapper {
            width: 50px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }
          .contact-card:hover .icon-wrapper {
            transform: scale(1.1);
          }
        `}
      </style>
    </>
  );
}

export default Contact;
