import React, { useState } from 'react';
import './CSS/LoginSignup.css';
import Navbar from '../Components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";

const LoginSignup = () => {  // state untuk menyimpan nilai
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const loginUrl = process.env.REACT_APP_BASEURL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post(loginUrl + '/login', { email, password });
      if (loginResponse.status === 200) {
        const tokenObject = loginResponse.data;
        const tokenString = JSON.stringify(tokenObject);
        localStorage.setItem("tokenMember", tokenString);
        // Function to fetch paginated member data
        const fetchMembers = async (page = 1) => {
          const response = await axios.get(`${loginUrl}/members?page=${page}`, {
            headers: {
              Authorization: `Bearer ${tokenObject.access_token}`
            }
          });
          return response.data;
        };
   
        // Loop through paginated data until the member is found or no more pages
        let memberId = null;
        let page = 1;
        let membersData;
        do {
          membersData = await fetchMembers(page);
          const member = membersData.data.find(member => member.email === email);
          if (member) {
            memberId = member.id;
            break;
          }
          page++;
        } while (membersData.data.length > 0);
   
        if (memberId) {
          localStorage.setItem("memberId", memberId);
          localStorage.setItem('userEmail', email);
          console.log('Member ID:', memberId);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        } else {
          setError("Gagal menemukan member ID, silakan coba lagi.");
        }
      } else {
        setError("Gagal login, silakan coba lagi.");
      }
    } catch (error) {
      console.error(error);
      setError("Email atau kata sandi salah");
    }
  };


  return (
    <div>
      <Navbar />
      <div className='container-login'>
        <div className="card-login">
          <h1>LOGIN</h1>
          <form className="submitForm" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /><br />
            <label htmlFor="password">Password</label>
            <div className="password-input-hide">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="show-hide-button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <BiSolidHide className='bisolid' /> : <BiSolidShow className='bisolid' />}
              </button>
            </div>
            <br />
            <div className="errorrr">
              {error && <Alert variant="outlined" severity="error" className='alert-error'>{error}</Alert>}
            </div>
            <p>
              <button className='signup' type="submit" id="btn">Login</button> <br />
            </p>
            <p className='signup-1'>Don’t have an account? <Link to="/register" className='link'>Sign Up</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
