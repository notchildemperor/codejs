import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './ShirtPantsShoes.css';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import axios from 'axios'; 

const ShirtProduct = () => {
  // mengambil URL dasar dan URL gambar dari variabel lingkungan
  const url = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;
  // variabel state untuk mengelola data produk dan interaksi pengguna
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(ShopContext);

  // effect hook untuk mengambil data produk saat komponen dipasang
  useEffect(() => {
    getDataProducts();
  }, []);

  // fungsi untuk mengambil data produk dari api produks
  const getDataProducts = async () => {
    try {
      const response = await axios.get(url + '/produks');
      const dataProducts = await response.data;
      setProducts(dataProducts.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // fungsi untuk menangani klik pada produk
  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  // fungsi untuk menutup tampilan produk
  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  // fungsi untuk menangani perubahan pada input pencarian
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // gungsi untuk menangani penambahan produk ke keranjang
  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  // memfilter produk berdasarkan kueri pencarian
  const filteredProducts = products.filter((product) =>
    product.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) //huruf kecil
  );

  return (
    <div>
      {/* input pencarian */}
      <input
        className='input-search-product'
        type="text"
        placeholder="Cari Produk"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div className='shirt-product' id='shirt'>
        <div className="card-main-shirt">
          <div className="card-shirt">
            {/* merender produk yang difilter */}
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                // menampilkan produk sesuai dengan idnya
                if (product.category_id === 1) {
                  return (
                    <div
                      className="co-3"
                      key={product.id}
                      onClick={() => handleProductClick(product)}
                      role="button"
                      tabIndex={0}
                    >
                      <div className="main-card-shirt-main">
                        <div className="image-shirt">
                          <img src={imgUrl + '/' + product.gambar} alt="" />
                        </div>
                        <div className="block-card">
                          <div className="title-card-shirt">{product.nama_barang}</div>
                          <div className="desc-card-shirt">{descriptionLimit(product.deskripsi, 6)}</div>
                          <div className="price-shirt">Rp. {product.harga}</div>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return null;
                }
              })
            ) : (
              <div className="product-not-found">Produk tidak ditemukan</div>
            )}
          </div>
        </div>
        {/* produk yang ter display */}
        <div className="side-page">
          {selectedProduct && (
            <div>
              <ProductDisplay product={selectedProduct} onAddToCart={handleAddToCart} onClose={handleCloseProduct} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// fungsi untuk membatasi deskripsi
function descriptionLimit(deskripsi, maxWords) {
  const words = deskripsi.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return deskripsi;
}

export default ShirtProduct;
