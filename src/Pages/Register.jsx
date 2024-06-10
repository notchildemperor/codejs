import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import './CSS/LoginSignup.css';
import Navbar from '../Components/Navbar/Navbar';
import Alert from '@mui/material/Alert';
import axios from 'axios';

const Register = () => {
  const urlRegister = process.env.REACT_APP_BASEURL;
  const [formData, setFormData] = useState({
    nama_member: '',
    no_hp: '',
    email: '',
    password: '',
    konfirmasi_password: '',
  });
  const [error, setError] = useState("");

  const proceedRegister = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    try {
      const response = await axios.post(urlRegister+ '/auth/register', formData);

      if (response.status === 200) {
        alert('Registrasi berhasil!');
        window.location.href = '/login'
      } else {
        setError('Registrasi gagal');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Registrasi gagal');
    }
  };

  const validatePassword = () => {
    if (formData.password !== formData.konfirmasi_password) {
      setError('Konfirmasi password tidak sesuai');
      return false;
    }
    return true;
  };

  return (
    <div>
       <Navbar/>
      <div className='container-login'>
      <div className="card-login">
        <h1>SIGN UP</h1>
        <form onSubmit={handleSubmit} className="submitForm">
          <label htmlFor="nama">Name</label>
          <input value={formData.nama_member} onChange={proceedRegister} type="text" id="nama" name="nama_member" placeholder="Your Name" required /><br />
          <label htmlFor="email">Email</label>
          <input value={formData.email} onChange={proceedRegister} type="email" id="email" name="email" placeholder="Your Email" required /><br />
          <label htmlFor="phone">Phone Number</label>
          <input value={formData.no_hp} onChange={proceedRegister} type="number" id="phone" min={0} name="no_hp" placeholder="Your Phone Number" required /><br />
          <label htmlFor="password">Password</label>
          <input value={formData.password} onChange={proceedRegister} type="password" id="password" name="password" placeholder="Password" required /><br />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input value={formData.konfirmasi_password} onChange={proceedRegister} type="password" id="confirmPassword" name="konfirmasi_password" placeholder="Confirm Password" required /><br />
          {error && <Alert variant="outlined" severity="error" className='alert-error'>{error}</Alert>}

          <div className="apaapaapa">
            <button className='signup' type="submit" id="btn">Sign Up</button> <br/>
            <button>
              <Link to="/login" style={{color: 'black', fontWeight: '600', textDecoration: 'none'}}>Back <IoReturnUpBack/></Link>
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
    
  );
};

export default Register;
