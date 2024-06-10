import React, { useEffect, useState } from 'react';
import './CSS/LoginSignup.css';
import axios from "axios";
import Alert from '@mui/material/Alert';
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const loginUrl = process.env.REACT_APP_BASEURL;

  // useEffect(() =>{
  //   const token = localStorage.getItem('token');
  //   if(token){
  //     axios.post('/check-token', {token})
  //     .then(response => {

  //     })
  //     .catch(error => {
  //       alert('Expired Token')
  //       window.location.href = '/admin'
  //     })
  //   }
  // }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginUrl+ '/auth/admin', { email, password });
      if (response.status === 200) {
        localStorage.setItem("token", JSON.stringify(response.data));
        setTimeout(() =>{
          window.location.href = "/admin/dashboard";
        }, 1000)
        
      } else {
        setError("Gagal login, silakan coba lagi.");
      }
    } catch (error) {
      setError("Email atau kata sandi salah");
    }
  };

  return (
    <div className='container-login'>
      <div className="card-login">
        <h1>LOGIN AS ADMIN</h1>
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
              {showPassword ? <BiSolidHide className='bisolid'/> : <BiSolidShow className='bisolid'/> }
            </button>
          </div>
          <br />
          <div className="errorrr">
            {error && <Alert variant="outlined" severity="error" className='alert-error'>{error}</Alert>}
          </div>
          <p>
            <button className='signup' type="submit" id="btn">Login</button> <br/>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
