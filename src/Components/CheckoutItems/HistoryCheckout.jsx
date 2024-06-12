import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaCheck } from "react-icons/fa";
import './HistoryCheckout.css';

const HistoryCheckout = () => {
  const [checkout, setCheckout] = useState([]);
  const [productNames, setProductNames] = useState({});
  const baseUrl = process.env.REACT_APP_BASEURL;

  useEffect(() => {
    const fetchHistory = async () => {
      const memberId = localStorage.getItem('memberId');
      const token = localStorage.getItem('tokenMember');
      if (memberId && token) {
        try {
          const response = await axios.get(`${baseUrl}/members/${memberId}/checkout`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const checkoutData = response.data.data;
          // console.log(checkoutData);
          setCheckout(checkoutData);

          // Fetch product names
          const productIds = [...new Set(checkoutData.map(item => item.produk_id))];
          const productResponses = await Promise.all(productIds.map(id => axios.get(`${baseUrl}/produks/${id}`)));
          const productNamesMap = {};
          productResponses.forEach(res => {
            if (res.status === 200) {
              productNamesMap[res.data.id] = res.data.nama_barang;
            }
          });
          setProductNames(productNamesMap);          
        } catch (err) {
          console.error('Failed to fetch history or products:', err);
        }
      }
    };
    fetchHistory();
  }, [baseUrl]);

  return (
    <div className="history-checkout-container">
      <h1>History Checkout</h1>
      <div className="card-main-main-main">
        {checkout.length > 0 ? (
          checkout.map((item) => (
            <div className="card" key={item.id}>
              <div className="header">
                <div>
                  <p className="title">
                    Order #{item.id}
                  </p>
                  <p className="name">By {item.first_name} {item.last_name}</p>
                </div>
                <span className="image">{<FaCheck style={{ fontSize: '47px', color: 'white' }}/>}</span>
              </div>
              <p className="description">
                <strong>Product Name:</strong> {productNames[item.produk_id] || 'Loading...'}<br />
                <strong>Address : </strong> {item.address}, {item.city}, {item.province}, {item.postal_code}<br />
                <strong>Payment Number :</strong> {item.payment_number}<br />
                <strong>Total Price : </strong>Rp. {item.total_harga}<br />
                <strong>Status : </strong> {item.status}
              </p>
              <dl className="post-info">
                <div className="cr">
                  <dt className="dt">Created At</dt>
                  <dd className="dd">{new Date(item.created_at).toLocaleString()}</dd>
                </div>
                <div className="cr">
                  <dt className="dt">Email</dt>
                  <dd className="dd">{item.email}</dd>
                </div>
              </dl>
            </div>
          ))
        ) : (
          <p>No checkout history found.</p>
        )}
      </div>
    </div>
  );
};

export default HistoryCheckout;
