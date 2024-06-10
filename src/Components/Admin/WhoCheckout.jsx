import React, { useState, useEffect } from 'react';
import './DashboardAdmin.css';
import axios from 'axios';
import Sidebar from '../SideBar/SideBar';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const WhoCheckout = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const baseUrl = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const fetchProducts = async (page) => {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/admin';
        return;
      }

      try {
        const response = await axios.get(`${baseUrl}/checkout`, {
          headers: {
            'Authorization': `Bearer ${token}`
          },
          params: {
            page: page
          }
        });
        console.log(response.data); // tambahkan ini untuk memeriksa struktur data
        const data = response.data.data.data; // akses data array di dalam respons

        // periksa apakah data adalah array
        if (Array.isArray(data)) {
          setProducts(data);
          setTotalPages(response.data.data.last_page); // mengatur total halaman berdasarkan respons API
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts(currentPage);
  }, [baseUrl, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <div className='main-dashboard-admin'>
      <div className="side-page-dashboard-admin">
        <Sidebar />
      </div>
      <div className="right-page-admin">
        <h1>Checkout</h1>
        <div className='pagination'>
          <div>
            <button>
              <Link style={{ textDecoration: 'none', color: 'black', fontWeight: '600' }} to='/admin/dashboard'>
                <IoMdArrowRoundBack />BACK
              </Link>
            </button>
          </div>
        </div>
        <div className='label-name-top'>
          <table>
            <thead>
              <tr className='top-dashboard-table'>
                <th className='id-dashboard'>ID</th>
                <th className='gambar-dashboard-label'>Email</th>
                <th className='nama-dashboard-label'>Name</th>
                <th className='color-dashboard-label'>Address</th>
                <th className='tags-dashboard-label'>City</th>
                <th className='sku-dashboard-label'>Province</th>
                <th className='sku-dashboard-label'>Postal Code</th>
                <th className='sku-dashboard-label'>Payment Number</th>
                <th className='sku-dashboard-label'>Product Id</th>
                <th className='sku-dashboard-label'>Cart Id</th>
                <th className='sku-dashboard-label'>Total Price</th>
                <th className='created-dashboard-label'>Created At</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="12">Loading...</td>
                </tr>
              ) : (
                products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.email}</td>
                    <td>{product.first_name} {product.last_name}</td>
                    <td>{product.address}</td>
                    <td>{product.city}</td>
                    <td>{product.province}</td>
                    <td>{product.postal_code}</td>
                    <td>{product.payment_number}</td>
                    <td>{product.produk_id}</td>
                    <td>{product.cart_id}</td>
                    <td>{product.total_harga}</td>
                    <td>{product.created_at}</td>
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

export default WhoCheckout;
