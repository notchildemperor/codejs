import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaShoppingCart, FaBars, FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";
import { IoLogoGameControllerB, IoMdSearch } from 'react-icons/io';
import axios from 'axios';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const location = useLocation();
  const [cartItems, setCartItems] = useState([]);  // state untuk menyimpan item-item dalam keranjang belanja
  const cartUrl = process.env.REACT_APP_BASEURL;

  //memeriksa status login
  useEffect(() => {
    const token = localStorage.getItem('tokenMember');
    const adminToken = localStorage.getItem('token');
    setIsLoggedIn(!!token || !!adminToken);
  }, []);

  // mengambil data keranjang belanja dari api carts
  useEffect(() => {
    const fetchCartItems = async () => {
      const memberId = localStorage.getItem('memberId');
      if (memberId) {
        try {
          const response = await axios.get(`${cartUrl}/carts/${memberId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('tokenMember')}`
            }
          });
          const cartData = response.data;
          // mengatur data keranjang langsung ke state
          setCartItems(cartData);
        } catch (err) {
          console.error('failed:', err);
        }
      }
    };
    fetchCartItems();
  }, [cartUrl]);

  const handleToggle = () => {   // handler untuk membuka atau menutup menu dropdown
    setDropdownMenu(!dropdownMenu);
  };

  const handleLogout = () => {   // handler untuk proses logout pengguna dan menghapus token jika logout
    const confirmLogout = window.confirm("Apakah kamu yakin untuk log out?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      localStorage.removeItem('tokenMember');
      localStorage.removeItem('token');
      localStorage.removeItem('memberId');
    }
  };

  const toggleSidebar = () => {   // handler untuk membuka atau menutup sidebar
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {   // handler untuk menutup sidebar
    setSidebarOpen(false);
  };

  const [searchTerm, setSearchTerm] = useState('');   // handler untuk mengubah nilai state saat input pencarian produk berubah
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getActiveMenu = (path) => location.pathname === path ? 'active' : '';  // fungsi untuk menandai menu navigasi yang aktif berdasarkan lokasi saat ini

  const totalCartItems = cartItems.length;   // menghitung jumlah total item dalam keranjang belanja

  return (
    <div className='main-main-navbar'>
      <div className="up-navbar">
        <div className="sosmed-navbar">
          <p><FaFacebookF /></p>
          <p><FaInstagram /></p>
          <p><FaTwitter /></p>
          <p><IoLogoGameControllerB /></p>
        </div>
        <div className="nama-web">E-COMMERCE ENJOYER</div>
        {/* <div className="search-produk-aja">
          <input type="text" placeholder="Search Product" className="search-input-nav" value={searchTerm} onChange={handleChange} />
          <button className="search-produk-nav"><IoMdSearch /></button>
        </div> */}
      </div>
      <div className="navbar">
        <div className="nav-logo">
          <p>E-COMMERCE ENJOYER</p>
        </div>
        <div className="nav-toggle" onClick={toggleSidebar}><FaBars /></div>
        <ul className={`nav-menu ${sidebarOpen ? 'active' : ''}`}>
          <li onClick={closeSidebar}>
            <Link className={getActiveMenu('/')} style={{ textDecoration: 'none', color: 'white' }} to="/">Home</Link>
            {location.pathname === '/' && <hr />}
          </li>
          <li onClick={closeSidebar}>
            <Link className={getActiveMenu('/shirt')} style={{ textDecoration: 'none', color: 'white' }} to="/shirt">Shirt</Link>
            {location.pathname === '/shirt' && <hr />}
          </li>
          <li onClick={closeSidebar}>
            <Link className={getActiveMenu('/pants')} style={{ textDecoration: 'none', color: 'white' }} to="/pants">Pants</Link>
            {location.pathname === '/pants' && <hr />}
          </li>
          <li onClick={closeSidebar}>
            <Link className={getActiveMenu('/shoes')} style={{ textDecoration: 'none', color: 'white' }} to="/shoes">Shoes</Link>
            {location.pathname === '/shoes' && <hr />}
          </li>
          {isLoggedIn ? (
            <li className="dropdown">              
              <button className="dropdown-toggle" onClick={handleToggle} style={{ color: 'white' }}>
                <HiUser className='icon-user-navbar-h' />
              </button>
              {dropdownMenu && (
                <div className="popup" style={{ color: 'white' }}>
                  <button className="popup-item">
                    <Link to="/profile" style={{ textDecoration: 'none', color: 'white' }}>Profile</Link>
                  </button>
                  <button className="popup-item" onClick={handleLogout}>
                    <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Sign Out</Link>
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link style={{ textDecoration: 'none', color: 'white' }} to={isLoggedIn ? "/" : "/login"} onClick={toggleSidebar}>
                {isLoggedIn ? "Logout" : "Login"}
              </Link>
            </li>
            )}
          <li>
            <Link className="cart-icon" to="/cart" onClick={toggleSidebar}>
              {' '}
              <FaShoppingCart style={{ fontSize: '24px', color: 'white' }} />{' '}
            </Link>
          </li>
          {/* menampilkan jumlah total item dalam keranjang */}
          <li className="nav-cart-count">{totalCartItems}</li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

