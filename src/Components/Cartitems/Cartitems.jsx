import React, { useContext, useEffect, useState } from 'react';
import './Cartitems.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import { TbShoppingBagMinus } from "react-icons/tb";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const Cartitems = () => {
    // const imageUrl = process.env.REACT_APP_BASEIMG;
    const cartsUrl = process.env.REACT_APP_BASEURL;
    const { cartItems } = useContext(ShopContext);
    const [products, setProducts] = useState([]);
    const memberIdLogin = localStorage.getItem('memberId');
    const [combinedProducts, setCombinedProducts] = useState({});
    const [selectedProducts, setSelectedProducts] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDataCarts = async () => { //mendapatkan data dari api carts
            try {
                const token = localStorage.getItem('tokenMember');
                const tokenMember = JSON.parse(token);
                const memberToken = tokenMember.access_token
                if (!tokenMember) {
                    window.location.href = '/login';
                    return;
                }

                const response = await axios.get(`${cartsUrl}/carts`, {
                    headers: {
                        'Authorization': `Bearer ${memberToken}`
                    }
                });

                const userCarts = response.data.data.filter(item => item.member_id === memberIdLogin); //inisialisasi data di halaman cart berdasarkan member id yg login

                setProducts(userCarts);
            } catch (error) {
                console.log('Error fetching product cart:', error);
            }
        };

        fetchDataCarts();  // memanggil fungsi fetchDataCarts ketika komponen di-mount
    }, [cartsUrl, memberIdLogin]);

    useEffect(() => {
        const combineProducts = () => {
            const combined = {};
            products.forEach((product) => {
                const productId = product.produk_id; //mengambil product_id dari setiap produk
                if (combined[productId]) {
                    combined[productId].quantity += 1; //jika produk ada, tambahkan quantity
                } else {
                    combined[productId] = { ...product, quantity: 1 };
                }
            });
            return combined; //mengembalikan prouct yg sudah di combined
        };

        setCombinedProducts(combineProducts()); //menyimpan hasil di combinedProduct
    }, [products]);

    const handleDeleteCart = async (productId) => {
        try {
            setCombinedProducts(prevCombinedProducts => { //menghapus produk dari newCombinedProduct
                const newCombinedProducts = { ...prevCombinedProducts };
                delete newCombinedProducts[productId];
                return newCombinedProducts;
            });

            const token = localStorage.getItem('tokenMember');
            const tokenMember = JSON.parse(token);
            const memberToken = tokenMember.access_token;
            await axios.delete(`${cartsUrl}/carts/${productId}`, { //mengirimkan permintaan delete ke api carts
                headers: {
                    'Authorization': `Bearer ${memberToken}`
                }
            });
            toast.success('Delete Successfully'); //alert

            // console.log('udah kehapus');
        } catch (error) {
            console.log(error);
        }
    };
    

    const handleCheckboxChange = (productId) => {
        setSelectedProducts(prevSelectedProducts => {
            const updatedSelectedProducts = { ...prevSelectedProducts };
            if (updatedSelectedProducts[productId]) {
                delete updatedSelectedProducts[productId]; // jika produk sudah dipilih, hapus dari updatedSelectedProducts
            } else {
                updatedSelectedProducts[productId] = combinedProducts[productId]; // jika produk belum dipilih, tambahkan ke updatedSelectedProducts
            }
            return updatedSelectedProducts; //mengembalikan nilai
        });
    };

    const handleCheckout = () => {
        const selectedProductArray = Object.values(selectedProducts); // mengubah selectedProducts menjadi array
        if (selectedProductArray.length > 0) {
            navigate('/checkout', { //  // menavigasi ke halaman checkout dengan produk yang dipilih dan total harga
                state: { 
                    selectedProducts: selectedProductArray,
                    totalAmount: getTotalCardAmount(),
                    totalFee: getTotalFee(),
                    totalFinal: getTotalFinal()
                 } });
        } else {
            toast.error('Please Choose Product'); //alert
        }
    };

    const getTotalCardAmount = () => { //menghitung total harga semua produk yg dipilih
        let totalAmount = 0;
        for (const productId in selectedProducts) {
            const product = selectedProducts[productId];
            totalAmount += parseFloat(product.harga) * product.quantity;
        }
        return totalAmount;
    };

    const getTotalFee = () => { //menghitung biaya dengan tambahan 2% dari total harga
        let totalFee = 0;
        for (const productId in selectedProducts) {
            const product = selectedProducts[productId];
            totalFee += parseFloat(product.harga) * product.quantity * 0.02;
        }
        return totalFee;
    };

    const getTotalFinal = () => { //menghitung total akhir dari total harga + total biaya
        return getTotalCardAmount() + getTotalFee();
    };

    return (
        <div className='cartitems'>
              <Toaster position="top-center" reverseOrder={false} />
            <div className="cartsecond">
                <div className="cartitems-format-main">
                    <p>Check</p>
                    <p>Produk</p>
                    <p>Judul</p>
                    <p>Harga</p>
                    <p>Kuantitas</p>
                    <p>Total</p>
                    <p>Hapus</p>
                </div>
                <hr />
                <div className="cart-in-cart">
                    {Object.values(combinedProducts).map((product, index) => {
                        const cartItemQuantity = cartItems[product.produk_id] || 0;
                        return (
                            <div key={product.id} className="cartitems-format cartitems-format-main">
                                <div className="id-id-produk">
                                    <input 
                                        type='checkbox'
                                        checked={!!selectedProducts[product.produk_id]}
                                        onChange={() => handleCheckboxChange(product.produk_id)}
                                    />
                                </div>
                                <div className="image-cart-produk">
                                    <img src={product.gambar} alt={product.nama_barang || 'Tanpa judul'} />
                                </div>
                                <p className='title-product-cart'>{product.nama_barang || 'Tanpa judul'}</p>
                                <p className='cart-items-price-total'>Rp. {parseFloat(product.harga).toLocaleString('id-ID')}</p>
                                <p className='cartitems-quantity-cart'>{product.quantity}</p>
                                <p className='cart-items-price-total'>Rp. {(parseFloat(product.harga) * product.quantity).toLocaleString('id-ID')}</p>
                                <button className='cartitems-remove-icon' onClick={() => handleDeleteCart(product.id)}>
                                    <TbShoppingBagMinus />
                                </button>
                            </div>
                        );
                    })}
                </div>
                <hr />
            </div>

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Total Keranjang</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p>Rp. {getTotalCardAmount().toLocaleString('id-ID')}</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <p>Biaya</p>
                            <p>Rp. {getTotalFee().toLocaleString('id-ID')}</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3>Rp. {getTotalFinal().toLocaleString('id-ID')}</h3>
                        </div>
                    </div>
                    <div className="btn-btn-btn">
                        <button className='btn-checkout' onClick={handleCheckout}>
                            CHECKOUT
                        </button>
                        <button className='btn-back-back'>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'><IoMdArrowRoundBack />BACK</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cartitems;
