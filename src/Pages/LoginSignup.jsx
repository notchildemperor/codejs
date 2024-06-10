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

  const handleSubmit = async (e) => { //fungsi untuk menangani form submit
    e.preventDefault();
    try {
      const loginResponse = await axios.post(loginUrl + '/login', { email, password }); //mengirim permintaan post ke api login
      if (loginResponse.status === 200) { //jika login berhasil, menyimpan tokenMember ke local storage
        const tokenObject = loginResponse.data;
        const tokenString = JSON.stringify(tokenObject);
        localStorage.setItem("tokenMember", tokenString);
        setTimeout(() =>{ //redirect ke halaman utama setelah 1 detik
          window.location.href = "/";
        }, 1000)
        const membersResponse = await axios.get(loginUrl + '/members', { //mendapatkan data members
          headers: {
            Authorization: `Bearer ${tokenObject.access_token}`
          }
        });

        console.log('Members response:', membersResponse);

        const member = membersResponse.data.data.find(member => member.email === email); //menyesuaikan member yang sesuai dengan email untuk login
        if (member) {
          const memberId = member.id;
          localStorage.setItem("memberId", memberId);
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
