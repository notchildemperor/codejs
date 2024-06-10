import React, { useContext, useState, useEffect } from 'react';
import './CheckoutItems.css';
import { useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const CheckoutItems = () => {
    const checkoutUrl = process.env.REACT_APP_BASEURL;
    const location = useLocation();
    const { selectedProducts, totalFee, totalFinal } = location.state;
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [apartmen, setApartmen] = useState('');
    const [city, setCity] = useState('');
    const [province, setProvince] = useState('');
    const [postal_code, setPostalCode] = useState('');
    const [payment_number, setPaymentNumber] = useState('');
    const [produk_id, setProdukId] = useState('');
    const [cart_id, setCartId] = useState('');
    const [member_id, setMemberId] = useState('');
    const [total_harga, setTotalHarga] = useState('');
    const [productNames, setProductNames] = useState([]);
    const [productPrices, setProductPrices] = useState([]);
    const [totalCardAmount, setTotalCardAmount] = useState(0);

    const provinces = [
        "Aceh", "Bali", "Bangka Belitung", "Banten", "Bengkulu", "Gorontalo", "DKI Jakarta",
        "Jambi", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Kalimantan Barat", "Kalimantan Selatan",
        "Kalimantan Tengah", "Kalimantan Timur", "Kalimantan Utara", "Kepulauan Riau", "Lampung",
        "Maluku", "Maluku Utara", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Papua", "Papua Barat",
        "Riau", "Sulawesi Barat", "Sulawesi Selatan", "Sulawesi Tengah", "Sulawesi Tenggara", "Sulawesi Utara",
        "Sumatera Barat", "Sumatera Selatan", "Sumatera Utara", "Yogyakarta"
    ];

    useEffect(() => {
        if (selectedProducts && selectedProducts.length > 0) {

            const subtotal = selectedProducts.reduce((acc, product) => {
                return acc + (product.harga * product.quantity);
            }, 0);
            setTotalCardAmount(subtotal);

            setProdukId(selectedProducts.map(product => product.produk_id).join(','));

            setCartId(selectedProducts.map(product => product.id).join(','));

            setTotalHarga(totalFinal);

            setProductNames(selectedProducts.map(product => product.nama_barang));

            setProductPrices(selectedProducts.map(product => product.harga));

            const memberId = localStorage.getItem('memberId');
            setMemberId(memberId);
        }
    }, [selectedProducts, totalFinal]);

    const resetForm = () => { //reset form setelah sumbit
        setEmail('');
        setFirstName('');
        setLastName('');
        setAddress('');
        setApartmen('');
        setCity('');
        setProvince('');
        setPostalCode('');
        setPaymentNumber('');
        setProdukId('');
        setCartId('');
        setTotalHarga('');
        setMemberId('');
        setProductNames([]);
        setProductPrices([]);
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        // menjadikan seluruh inputan harus di isi
        if (!email || !first_name || !last_name || !address || !apartmen || !city || !province || !postal_code || !payment_number) {
            toast.error('Please fill in all required fields');
            return;
        }

        const token = localStorage.getItem('tokenMember');
        if (!token) {
            console.error('No token found');
            return;
        }
        const tokenMember = JSON.parse(token);
        const memberToken = tokenMember.access_token;

        const checkoutData = { //data yang akan di kirimkan
            email,
            first_name,
            last_name,
            address,
            apartmen,
            city,
            province,
            postal_code,
            payment_number,
            produk_id,
            cart_id,
            member_id,
            total_harga,
            nama_barang: productNames.join(','),
            harga: productPrices.join(',')
        };

        try {
              // kirim data checkout ke api checkout
            const response = await axios.post(`${checkoutUrl}/checkout`, checkoutData, {
                headers: {
                    'Authorization': `Bearer ${memberToken}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log('Success:', response.data);
            toast.success('Shipping Successfully');
            resetForm();
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className='container-checkout' id='container-checkout'>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="information-shipping-main">
                <label htmlFor="">Contact Information</label>
                <div className="contact-information">
                    <input type="email" placeholder='Your Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="shipping-address">
                    <label htmlFor="">Shipping Address</label>
                    <div className="name-order">
                        <input type="text" placeholder='First name' value={first_name} onChange={(e) => setFirstName(e.target.value)} required />
                        <input type="text" placeholder='Last name' value={last_name} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                    <div className="order-information">
                        <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
                        <input type="text" placeholder='Apartment, Suite, etc' value={apartmen} onChange={(e) => setApartmen(e.target.value)} required />
                        <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
                    </div>
                </div>
                <div className="detail-address">
                    <div className="province">
                        <label htmlFor="">Province</label>
                        <select name="" id="" className='select-province' value={province} onChange={(e) => setProvince(e.target.value)}>
                            <option value="">Select Province</option>
                            {provinces.map((province, index) => (
                                <option key={index} value={province}>{province}</option>
                            ))}
                        </select>
                    </div>
                    <input type="number" placeholder='Postal code' min={0} value={postal_code} onChange={(e) => setPostalCode(e.target.value)} />
                </div>
                <div className="detail-address">
                    <label htmlFor=""></label>
                    <input type="number" placeholder='Number' min={0} value={payment_number} onChange={(e) => setPaymentNumber(e.target.value)} />
                </div>
                <div className="continue-shipping">
                    <button className='btn-shipping' onClick={handleCheckout}>Continue Shipping</button>
                </div>
            </div>
            <div className="detail-checkout-right">
                <div className="rightttt">
                    <div className="image-checkkk">
                        <p>Product</p>
                    </div>
                    <div className="image-checkkk">
                        <p>Quantity</p>
                    </div>
                    <div className="image-checkkk">
                        <p>Price</p>
                    </div>
                </div>
                <div className="in-your-cart">
                    <div className="checkout-inside">
                        {selectedProducts.map((product, index) => (
                            <div key={index}>
                                <div className="small-detail-checkout">
                                    <div className="image-checkout-small">
                                        <img src={product.gambar} className='checkout-product-image' alt={product.nama_barang} />
                                    </div>
                                    <div className="title-checkout-small">
                                        <p>{product.quantity}</p>
                                    </div>
                                    <div className="total-checkout-small">
                                        <p className='checkout-items-price-total'>Rp. {product.harga * product.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="total-order-checkout">
                    <div className="cartitems-total">
                        <h1>Cart Total</h1>
                        <div>
                            <div className="cartitems-total-item">
                                <p>Subtotal</p>
                                <p>Rp.{parseFloat(totalCardAmount).toLocaleString('id-ID')}</p>
                            </div>
                            <hr />
                            <div className='cartitems-total-item'>
                                <p>Fee</p>
                                <p>Rp. {parseFloat(totalFee).toLocaleString('id-ID')}</p>
                            </div>
                            <hr />
                            <div className="cartitems-total-item">
                                <h3>Total</h3>
                                <h3>Rp.  {parseFloat(totalFinal).toLocaleString('id-ID')}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutItems;
