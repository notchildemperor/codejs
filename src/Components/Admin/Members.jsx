import React, { useState, useEffect } from 'react';
import './DashboardAdmin.css';
import axios from 'axios';
import { ImBin } from "react-icons/im";
import Sidebar from '../SideBar/SideBar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdBlock } from "react-icons/md";
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const MembersAdmin = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const baseUrl = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const fetchMembers = async (page) => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin';
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/members`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page: page
          }
        });

        const data = response.data.data; // akses data array di dalam respons

        // periksa apakah data adalah array
        if (Array.isArray(data)) {
          setMembers(data);
          setTotalPages(response.data.last_page); // mengatur total halaman berdasarkan respons API
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers(currentPage);
  }, [baseUrl, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

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

  const handleBan = async (id) => {
    try{
      const adminToken = localStorage.getItem('token');
      const tokenObject = JSON.parse(adminToken);
      const token = tokenObject.access_token;
      const confirmBan = window.confirm("Yakin mau di blokir nih?");
      if (confirmBan){
        await axios.post(`${baseUrl}/members/${id}/ban`, {},{
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        setMembers(members.map(member => member.id === id ? { ...member, is_banned: true} : member))
      }
    } catch (error){
      console.log("gagal", error);
    }
  }

  const handleUnban = async (id) => {
    try{
      const adminToken = localStorage.getItem('token');
      const tokenObject = JSON.parse(adminToken);
      const token = tokenObject.access_token;
      const confirmBan = window.confirm("Yakin mau di buka blokirnya?");
      if (confirmBan){
        await axios.post(`${baseUrl}/members/${id}/unban`, {},{
          headers: {
            'Authorization' : `Bearer ${token}`
          }
        })
        setMembers(members.map(member => member.id === id ? { ...member, is_banned: false} : member))
      }
    } catch (error){
      console.log("gagal", error);
    }
  }

  return (
    <div className='main-dashboard-admin'>
      <div className="side-page-dashboard-admin">
        <Sidebar />
      </div>
      <div className="right-page-admin">
        <h1>All Members</h1>
        <button>
          <Link style={{textDecoration: 'none', color: 'black', fontWeight: '600'}} to='/admin/dashboard'>
            <IoMdArrowRoundBack />BACK
          </Link>
        </button>
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
                <th className='action-dashboard-label'>Status</th>
                <th className='action-dashboard-label'>Block/UnBlock</th>
                <th className='action-dashboard-label'>Delete</th>
              </tr>
            </thead>
            <tbody>
            {loading ? (
              <tr>
                <td colSpan="9">Loading...</td>
              </tr>
              ) : (
                members.map(member => (
                  <tr key={member.id}>
                    <td>{member.id}</td>
                    <td>{member.nama_member}</td>
                    <td>{member.no_hp}</td>
                    <td>{member.email}</td>
                    <td className='password-all-members'>{member.password}</td>
                    <td>{member.created_at}</td>
                    <td style={{ textAlign: 'center' }}>
                      {member.is_banned ? <MdBlock/> : 'No'}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => member.is_banned ? handleUnban(member.id) : handleBan(member.id)} disabled={member.is_banned}>
                        {member.is_banned ? 'unBlock' : 'block'}
                      </button>
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <button onClick={() => handleDelete(member.id)}><ImBin /></button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className='pagination-right'>
          <Stack spacing={2}>
            <Pagination 
              count={totalPages} 
              page={currentPage} 
              onChange={handlePageChange} 
              variant="outlined" 
              shape="rounded" 
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default MembersAdmin;
