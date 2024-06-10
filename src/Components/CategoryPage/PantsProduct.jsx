import React, { useEffect, useState, useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './ShirtPantsShoes.css';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import axios from 'axios';

const ShirtProduct = () => {
  const url = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useContext(ShopContext);

  useEffect(() => {
    getDataProducts();
  }, []);

  const getDataProducts = async () => {
    try {
      const response = await axios.get(url+ '/produks');
      const dataProducts = await response.data;
      setProducts(dataProducts.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseProduct = () => {
    setSelectedProduct(null);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleAddToCart = (productId) => {
    addToCart(productId);
  };

  const filteredProducts = products.filter((product) =>
    product.nama_barang.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input
        className='input-search-product'
        type="text"
        placeholder="Search Product"
        value={searchQuery}
        onChange={handleSearchInputChange}
      />
      <div className='shirt-product' id='shirt'>
        <div className="card-main-shirt">
          <div className="card-shirt">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                if (product.category_id === 2) {
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
              <div className="product-not-found">Product not found</div>
            )}
          </div>
        </div>
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

function descriptionLimit(deskripsi, maxWords) {
  const words = deskripsi.split(' ');
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(' ') + '...';
  }
  return deskripsi;
}

export default ShirtProduct;
