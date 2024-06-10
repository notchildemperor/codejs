import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './GrafikAdmin.css';
import { Link } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);

const GrafikAdmin = () => {
  const [productData, setProductData] = useState([0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const urlDashboard = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token is not available');
          window.location.href = '/admin';
          return;
        }

        let tokenObject;
        try {
          tokenObject = JSON.parse(token);
        } catch (error) {
          console.error('Error parsing token:', error);
          return;
        }

        const adminToken = tokenObject.access_token;

        const response = await axios.get(urlDashboard + '/dashboard', {
          headers: {
            'Authorization': `Bearer ${adminToken}`
          }
        });
        console.log(response);

        const data = response.data;
        const productCounts = [data.baju_Produks, data.celana_Produks, data.sepatu_Produks];
        const totalProducts = data.total_Produks;
        const productPercentages = productCounts.map(count => (count / totalProducts) * 100);

        setProductData(productPercentages);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [urlDashboard]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('token');
    if (!adminLoggedIn) {
      window.location.href = '/admin';
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const blockData = {
    labels: ['Baju', 'Celana', 'Sepatu'],
    datasets: [
      {
        label: 'Total Product',
        data: productData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const circleData = {
    labels: ['Baju', 'Celana', 'Sepatu'],
    datasets: [
      {
        label: 'Persentase Produk',
        data: productData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.3)',
          'rgba(54, 162, 235, 0.3)',
          'rgba(255, 206, 86, 0.3)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Total Produk Berdasarkan Kategori',
      },
    },
  };

  return (
    <div className='main-grafik-admin-admin'>
      <div className='main-grafik-admin'>
        <h1>Dashboard Admin</h1>
        <div className='grafik-admin'>
          <Bar data={blockData} options={options} />
        </div>
        <div className='right-circle-button'>
          <div className='circle-admin'>
            <Doughnut data={circleData} options={{ ...options, title: { display: true, text: 'Persentase Produk Berdasarkan Kategori' } }} />
          </div>
          <div className="open-upload-product">
            <Link to='/admin/upload-product' style={{ textDecoration: 'none' }}>
              <button className="button-upload-product">
                <p className="text">Upload Product</p>
              </button>
            </Link>
            <Link to='/admin/product' style={{ textDecoration: 'none' }}>
              <button className="button-upload-product">
                <p className="text">See All Product</p>
              </button>
            </Link>
            <Link to='/admin/who-checkout' style={{ textDecoration: 'none' }}>
              <button className="button-upload-product">
                <p className="text">See Product Checkout</p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafikAdmin;
