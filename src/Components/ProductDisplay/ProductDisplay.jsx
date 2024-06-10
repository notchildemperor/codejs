import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import { IoMdClose } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const ProductDisplay = ({ product, onClose }) => {
  const imgUrl = process.env.REACT_APP_BASEIMG;
  const fullImageUrl = `${imgUrl}/${product.gambar}`; //menjadikan gambar sebagai url
  const cartsUrl = process.env.REACT_APP_BASEURL;
  const { addToCart } = useContext(ShopContext); //mengambil fungsi add to cart dari shopContext
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState(null);
  const { cartItems } = useContext(ShopContext);

  useEffect(() => {
    const tokenMember = localStorage.getItem('tokenMember');
    const memberId = localStorage.getItem('memberId')
    setIsLoggedIn(!!tokenMember);
    setMemberId(memberId);
  }, []);

  const handleAddToCart = async () => { //handler untuk memasukan produk ke keranjang
    // alert('ditambahkan ke keranjang')
    if (!isLoggedIn) {
      toast.error('please login first')
      // setTimeout(() => {
      //   window.location.href = '/login';
      // }, 2000);
    } else {
      try {
        const token = localStorage.getItem('tokenMember');
        const tokenMember = JSON.parse(token);
        const memberToken = tokenMember.access_token;
        console.log('token:', token);
        const existingCartItem = cartItems[product.id];
        if (existingCartItem){
          addToCart(product.id, existingCartItem + 1);
        } else{
          addToCart(product.id, 1)
        }
        await axios.post( //mengirimkan data ke api carts
          cartsUrl+ '/carts',
          {
            produk_id: product.id,
            member_id: memberId,
            gambar: fullImageUrl,
            nama_barang: product.nama_barang,
            harga: product.harga
          },
          {
            headers: {
              Authorization: `Bearer ${memberToken}`
            }
          }
        );
        toast.success('Added Successfully');
        setTimeout(() => {
        }, 2000);
      } catch (error) {
        // console.error('Error:', error.response ? error.response.data : error.message);
        toast.error('Added Product Failed, please Login again');
      }
    }
  };

  return (
    <div className='productdisplay-popup'>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="productdisplay-container">
        <div className="productdisplay-header">
          <IoMdClose className='close-button' onClick={onClose} />
        </div>
        <div className="productdisplay-content">
          <div className="productdisplay-left">
            <div className="productdisplay-img">
              <img className='productdisplay-main-img' src={`${imgUrl}/${product.gambar}`} alt={product.nama_barang} />
            </div>
          </div>
          <div className="productdisplay-right">
            <h1>{product.nama_barang}</h1>
            <div className="productdisplay-right-prices">
              <div className='productdisplay-right-price-new'>Rp. {product.harga}</div>
            </div>
            <div className="productdisplay-right-description">
              {descriptionLimit(product.deskripsi, 12)}
            </div>
            <div className="productdisplay-right-size">
              <h1>Pilih Ukuran</h1>
              <select>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div className='buton-category-tag'>
              <button onClick={handleAddToCart}>ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function descriptionLimit(deskripsi, maxKata) {
  const kata = deskripsi.split(' ');
  if (kata.length > maxKata) {
    return kata.slice(0, maxKata).join(' ') + '...';
  }
  return deskripsi;
}

export default ProductDisplay;
