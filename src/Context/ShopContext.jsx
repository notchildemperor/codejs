import axios from "axios";
import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
    const cartsUrl = process.env.REACT_APP_BASEURL;
    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});

    // useEffect untuk mengambil data keranjang
    useEffect(() => {
        const fetchCartItems = async () => {
            const token = localStorage.getItem('tokenMember');
            if (!token) {
                console.error('gaada token');
                return;
            }

            let tokenMember;
            try {
                tokenMember = JSON.parse(token); // parsing token dari localStorage
            } catch (error) {
                console.error('Error parsing token:', error);
                return;
            }

            const memberToken = tokenMember.access_token;
            try {
                const response = await axios.get(cartsUrl + '/carts', {
                    headers: {
                        'Authorization': `Bearer ${memberToken}`
                    }
                });
                const data = response.data;
                const cartItemsData = {};
                data.data.forEach(item => {
                    cartItemsData[item.produk_id] = cartItemsData[item.produk_id] ? cartItemsData[item.produk_id] + 1 : 1;
                });
                setCartItems(cartItemsData); // mengatur state item keranjang
            } catch (error) {
                console.error('Error fetching cart items:', error);
            }
        };

        fetchCartItems();
    }, [cartsUrl]); // bergantung pada perubahan cartsUrl

    // useEffect untuk mengambil daftar produk saat komponen pertama kali dirender
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(cartsUrl + '/produks');
                const data = response.data;
                setProducts(data.data); // mengatur state produk
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [cartsUrl]);

    // fungsi untuk menambahkan item ke keranjang
    const addToCart = (itemId, quantity = 1) => { //id dari item, nilai default quantity adalah 1
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] ? prev[itemId] + quantity : quantity })); //callback menerima parameter prev
    };

    // fungsi untuk menghitung total harga barang di keranjang
    const getTotalCardAmount = () => {
        let totalAmount = 0; //deklarasi variabel dgn nilai awal 0
        Object.keys(cartItems).forEach((itemId) => { //mendapat array dengan keys itemid di dalam cartitems
            const itemInfo = products.find((product) => product.id === Number(itemId)); //mencari produk dlm array product yg memiliki id, mengkonversi string mnjd angka
            if (itemInfo && cartItems[itemId] > 0) { //memastikan itemInfo tidak undefined dan item lebih dari 0
                totalAmount += itemInfo.harga * cartItems[itemId];
            }
        });
        return totalAmount;
    };

    // fungsi untuk menghitung total biaya tambahan
    const getTotalFee = () => {
        const feePercent = 0.02; //menentukan biaya sebanyak 2%
        return getTotalCardAmount() * feePercent;
    };

    // fungsi untuk menghitung total akhir (harga barang + biaya tambahan)
    const getTotalFinal = () => {
        return getTotalCardAmount() + getTotalFee();
    };

    // nilai-nilai yang akan disediakan oleh konteks
    const contextValue = {
        getTotalFinal,
        getTotalFee,
        getTotalCardAmount,
        products,
        cartItems,
        addToCart,
        setCartItems
    };

    // Mengembalikan penyedia konteks yang mengelilingi children dengan nilai konteks
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
