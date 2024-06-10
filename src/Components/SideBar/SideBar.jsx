import React, { useEffect, useState } from 'react';
import './SideBar.css';
import { IoHome } from "react-icons/io5";
import { FaBoxesPacking } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { HiUser } from "react-icons/hi2";
import { IoIosInformationCircle } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPeople } from "react-icons/io";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const adminToken = localStorage.getItem('token');
    setIsLoggedIn(!!adminToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    const confirmLogout = window.confirm("Mau log out dari Admin?")
    if (confirmLogout) {
      setIsLoggedIn(false);
    }
  }

  const handleToggleDropdown = () => {
    setDropdownMenu(!dropdownMenu);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button className="sidebar-toggle-button" onClick={toggleSidebar}>
        <GiHamburgerMenu/>
      </button>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className='hello-admin'>
          Ecommerce Admin
        </div>
        <ul>
          <li><a href="/admin/dashboard"><IoHome className='symbol-sidebar' />Dashboard</a></li>
          <li><a href="/admin/product"><FaBoxesPacking className='symbol-sidebar' />All Products</a></li>
          <li><a href="/admin/who-checkout"><IoIosInformationCircle className='symbol-sidebar' />Information</a></li>
          <li><a href="/admin/members"><IoMdPeople className='symbol-sidebar' />All Members</a></li>
          {isLoggedIn ? (
            <li className="dropdown">
              <button className="dropdown-toggle" onClick={handleToggleDropdown} style={{ color: 'white' }}>
                <li className="justify-profile">
                  <HiUser className='icon-admin-profile' />
                  Hello Admin!
                </li>
              </button>
              {dropdownMenu && (
                <div className="popup-admin" style={{ color: 'white' }}>
                  <button className="popup-item-admin" onClick={handleLogout}>
                    <Link to="/admin" style={{ textDecoration: 'none', color: 'white' }}>Sign Out</Link>
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li>
              <Link style={{ textDecoration: 'none', color: 'white' }} to={isLoggedIn ? "/" : "/admin"} onClick={toggleSidebar}>
                {isLoggedIn ? "Logout" : "Login"}
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
