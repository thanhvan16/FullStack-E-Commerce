import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <Link to="/" className="logo">
          <h1>FootballShoes</h1>
        </Link>

        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <ul className="nav-list">
            <li><Link to="/" className="nav-link">Trang chủ</Link></li>
            <li><Link to="/products" className="nav-link">Sản phẩm</Link></li>
            <li><Link to="/about" className="nav-link">Giới thiệu</Link></li>
            <li><Link to="/contact" className="nav-link">Liên hệ</Link></li>
          </ul>
        </nav>

        <div className="header-actions">
          <div className="search-box">
            <input type="text" placeholder="Tìm kiếm..." />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <Link to="/cart" className="cart-icon">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">0</span>
          </Link>

          <div className="user-menu">
            <Link to="/login" className="btn btn-primary">Đăng nhập</Link>
          </div>

          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 