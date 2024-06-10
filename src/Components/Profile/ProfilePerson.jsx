import React, { useState, useEffect } from 'react';
import { FaCircleUser } from "react-icons/fa6";
import axios from "axios";
import './ProfilePerson.css';

const Profile = () => {
  const [user, setUser] = useState({});
  const personUrl = process.env.REACT_APP_BASEURL;

  useEffect(() => { //mengambil data api person
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('tokenMember');
        const tokenMember = JSON.parse(token);
        const memberToken = tokenMember.access_token;
        // console.log("Token:", token);
        const response = await axios.get(personUrl+ '/person', {
          headers: { 
            'Authorization': `Bearer ${memberToken}` 
          }
        });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          console.error("Gagal", response.statusText);
        }
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className='main-profile'>
      <section className='profile-person'>
      <h1 className='user-profile-name'>User Profile</h1>
        <div className='profile-container'>
          <div className="avatar-user">
            <h1 className='user-avatar'><FaCircleUser /></h1>
          </div>
          <div className='flex'>
            <div className='user-detail'>
              <span>Name</span>
              <p>{user.nama_member}</p>
            </div>
            <div className='user-detail'>
              <span>Phone Number</span>
              <p>{user.no_hp}</p>
            </div>
            <div className='user-detail'>
              <span>Email</span>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="desc-user">
          <p className='desc-user-paragraf'>
          Welcome <span className='desc-user-name'>{user.nama_member}</span> to E-Commerce Enjoyer, 
          where every click brings you closer to your 
          desires! As a new member of our digital family, 
          we extend our warmest greetings to you. Here, your 
          shopping experience is not just about transactions.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Profile;
