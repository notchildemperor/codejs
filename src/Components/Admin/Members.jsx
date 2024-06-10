import React, { useState, useEffect } from 'react';
import './DashboardAdmin.css';
import axios from 'axios';
import { ImBin } from "react-icons/im";
import Sidebar from '../SideBar/SideBar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const MembersAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseUrl+ '/members');
        setMembers(response.data.data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [baseUrl]);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('token');
    if (!isAdminLoggedIn) {
      window.location.href = '/admin';
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      const adminToken = localStorage.getItem('token');
      const tokenObject = JSON.parse(adminToken);
      const token = tokenObject.access_token;
      const confirmDelete = window.confirm("Yakin nih mau dihapus?");
      if (confirmDelete) {
        await axios.delete(`${baseUrl}/members/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMembers(members.filter(members => members.id !== id));
      }
    } catch (error) {
      console.log('Error, gagal menghapus:', error);
    }
  };

  return (
    <div className='main-dashboard-admin'>
      <div className="side-page-dashboard-admin">
        <Sidebar />
      </div>
      <div className="right-page-admin">
        <h1>All Members</h1>
        <button><Link style={{textDecoration: 'none', color: 'black', fontWeight: '600'}} to='/admin/dashboard'><IoMdArrowRoundBack/>BACK</Link></button>
        <div className='label-name-top'>
          <table>
            <thead>
              <tr className='top-dashboard-table'>
                <th className='id-dashboard'>ID</th>
                <th className='gambar-dashboard-label'>Member Name</th>
                <th className='nama-dashboard-label'>Number</th>
                <th className='harga-dashboard-label'>Email</th>
                <th className='size-dashboard-label'>Password</th>
                <th className='created-dashboard-label'>Created At</th>
                <th className='action-dashboard-label'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11">Loading...</td>
                </tr>
              ) : (
                members.map(members => (
                  <tr key={members.id}>
                    <td>{members.id}</td>
                    <td className=''>{members.nama_member}</td>
                    <td className=''>{members.no_hp}</td>
                    <td className=''>{members.email}</td>
                    <td className='password-all-members'>{members.password}</td>
                    <td className=''>{members.created_at}</td>
                    <td className='' style={{ textAlign: 'center' }}><button onClick={() => handleDelete(members.id)}><ImBin /></button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MembersAdmin;
