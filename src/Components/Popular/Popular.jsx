import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './Popular.css';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import axios from 'axios';

const PopularProduct = () => {
  const apiUrl = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    getDataProducts();
  }, []);

  const getDataProducts = async () => { //mendapatkan data dari api produks
    try {
      const response = await axios.get(apiUrl+ '/produks');
      setProducts(response.data.data);
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

  // gungsi untuk menangani penambahan produk ke keranjang
  const handleAddToCart = (product) => {
    addToCart(product.id);
  };

   // fungsi untuk menangani perubahan pada input pencarian
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // memfilter produk berdasarkan kueri pencarian
  const filteredProducts = products.filter((product) =>
    product.nama_barang.toLowerCase().includes(searchQuery.toLowerCase()) //huruf kecil
  );

  return (
    <div>
      <div className="popular" id="popular">
        <h1>POPULAR IN HERE</h1>
      </div>
      <div className="popular-product">
        <input
        className='input-search-product'
          type="text"
          placeholder="Search Product"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <div className="card-main-popular">
          <div className="card-popular">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="co-3"
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="main-card-popular-main">
                    <div className="image-popular">
                      <img src={`${imgUrl}/${product.gambar}`} alt={product.nama_barang} />
                    </div>
                    <div className="block-card">
                      <div className="title-card-popular">{product.nama_barang}</div>
                      <div className="desc-card-popular">{descriptionLimit(product.deskripsi, 6)}</div>
                      <div className="price-popular">Rp. {product.harga}</div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="product-not-found">Product not found</div>
            )}
          </div>
        </div>
        <div className="side-page-anjay">
          {selectedProduct && (
            <div>
              <ProductDisplay
                product={selectedProduct}
                onAddToCart={handleAddToCart}
                onClose={handleCloseProduct}
              />
            </div>
          )}
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

export default PopularProduct;
