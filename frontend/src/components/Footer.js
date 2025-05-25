import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { TbPlayFootball } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { FaAngleDoubleRight } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-bg py-3">
      <Container>
        <Row className="text-center text-md-start">
          {/* Logo và Giới thiệu */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-title">
              <NavLink className="navbar-brand fw-bold fs-4" to="/">
                <TbPlayFootball className="footer-logo" />
                <span className="brand-text">t-sport</span>
              </NavLink>
            </h5>
            <p className="footer-description">
              Xin chân thành cảm ơn quý khách hàng đã tin tưởng sử dụng dịch vụ của cửa hàng. 
              Chúng tôi cam kết mang đến những sản phẩm chất lượng nhất.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
            </div>
          </Col>

          {/* Hỗ Trợ */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-title">HỖ TRỢ</h5>
            <div className="footer-divider"></div>
            <ul className="footer-links">
              <li>
                <NavLink to="/doi-tra" className="footer-link">
                  <FaAngleDoubleRight /> Chính sách đổi trả
                </NavLink>
              </li>
              <li>
                <NavLink to="/bao-hanh" className="footer-link">
                  <FaAngleDoubleRight /> Chính sách bảo hành
                </NavLink>
              </li>
              <li>
                <NavLink to="/size-guide" className="footer-link">
                  <FaAngleDoubleRight /> Hướng dẫn chọn size
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className="footer-link">
                  <FaAngleDoubleRight /> FAQ
                </NavLink>
              </li>
            </ul>
          </Col>

          {/* Liên Hệ */}
          <Col md={4}>
            <h5 className="footer-title">LIÊN HỆ</h5>
            <div className="footer-divider"></div>
            <ul className="footer-contact">
              <li>
                <FaMapMarkerAlt className="contact-icon location" />
                <span>Mộ Lao, Hà Đông, Hà Nội</span>
              </li>
              <li>
                <FaPhoneAlt className="contact-icon phone" />
                <a href="tel:+84329140358" className="contact-link">+84 329 140 358</a>
              </li>
              <li>
                <FaEnvelope className="contact-icon email" />
                <a href="mailto:thanhvan4@gmail.com" className="contact-link">thanhvan4102004@gmail.com</a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;