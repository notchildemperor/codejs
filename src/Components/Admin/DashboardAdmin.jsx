import React, { useState, useEffect } from 'react';
import './DashboardAdmin.css';
import axios from 'axios';
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Sidebar from '../SideBar/SideBar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const DashboardAdmin = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(baseUrl+ '/produks');
        setProducts(response.data.data);
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

  const handleDelete = async (productId) => {
    try {
      const adminToken = localStorage.getItem('token');
      const tokenObject = JSON.parse(adminToken);
      const token = tokenObject.access_token;
      const confirmDelete = window.confirm("Yakin nih mau dihapus?");
      if (confirmDelete) {
        await axios.delete(`${baseUrl}/produks/${productId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProducts(products.filter(product => product.id !== productId));
      }
    } catch (error) {
      console.log('Error, gagal menghapus:', error);
    }
  };

  const handleUpdate = (productId) => {
    window.location.href = `/admin/update-product/${productId}`;
  };

  return (
    <div className='main-dashboard-admin'>
      <div className="side-page-dashboard-admin">
        <Sidebar />
      </div>
      <div className="right-page-admin">
        <h1>All Product</h1>
        <button><Link style={{textDecoration: 'none', color: 'black', fontWeight: '600'}} to='/admin/dashboard'><IoMdArrowRoundBack/>BACK</Link></button>
        <div className='label-name-top'>
          <table>
            <thead>
              <tr className='top-dashboard-table'>
                <th className='id-dashboard'>ID</th>
                <th className='gambar-dashboard-label'>Image</th>
                <th className='nama-dashboard-label'>Product Name</th>
                <th className='harga-dashboard-label'>Price</th>
                <th className='size-dashboard-label'>Size</th>
                <th className='color-dashboard-label'>Color</th>
                <th className='tags-dashboard-label'>Tags</th>
                <th className='sku-dashboard-label'>SKU</th>
                <th className='created-dashboard-label'>Created At</th>
                <th className='action-dashboard-label'>Update</th>
                <th className='action-dashboard-label'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="11">Loading...</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td className='image-dashboard'><img src={`${imgUrl}/${product.gambar}`} alt="gambar" /></td>
                    <td className='nama-barang-dashboard'>{product.nama_barang}</td>
                    <td>{product.harga}</td>
                    <td>{product.ukuran}</td>
                    <td>{product.warna}</td>
                    <td>{product.tags}</td>
                    <td>{product.sku}</td>
                    <td className='update-create-dashboard'>{product.created_at}</td>
                    <td className='action-dashboard' style={{ textAlign: 'center' }}><button onClick={() => handleUpdate(product.id)}><FaEdit/></button></td>
                    <td className='action-dashboard' style={{ textAlign: 'center' }}><button onClick={() => handleDelete(product.id)}><ImBin /></button></td>
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

export default DashboardAdmin;
