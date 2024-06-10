import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './UpdateProduct.css';

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    category_id: '',
    subkategori_id: '',
    gambar: '',
    nama_barang: '',
    harga: '',
    deskripsi: '',
    diskon: '',
    bahan: '',
    tags: '',
    sku: '',
    ukuran: '',
    warna: ''
  });
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const baseUrl = process.env.REACT_APP_BASEURL;
  const imageUrl = process.env.REACT_APP_BASEIMG;
  const adminToken = localStorage.getItem('token');

  useEffect(() => {
    const getProduct = async () => {
      try {
        if (!adminToken) {
          setError('Unauthorized: tidak ada token, login ulang');
          return;
        }

        const tokenObject = JSON.parse(adminToken);
        const token = tokenObject.access_token;

        const response = await axios.get(`${baseUrl}/produks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        // console.log(response.data);

        if (response.status === 200) {
          const { category_id, subkategori_id, gambar, nama_barang, harga, deskripsi, diskon, bahan, tags, sku, ukuran, warna } = response.data.data;
          setProduct({ category_id, subkategori_id, gambar, nama_barang, harga, deskripsi, diskon, bahan, tags, sku, ukuran, warna });
          setPreviewImage(`${imageUrl}/${gambar}`);
        } else {
          setError('Failed to fetch product data');
        }
      } catch (error) {
        console.log('Error: ' + (error.response?.data?.message || error.message));
        setError('Failed to fetch product data');
      }
    };

    getProduct();
  }, [baseUrl, id, adminToken, imageUrl]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if ((name === 'harga' || name === 'diskon') && value.length > 6) {
      return;
    }
    if (name === 'gambar' && files.length > 0) {
      const file = files[0];
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError('Invalid image format. Only JPG, PNG, and WEBP are allowed.');
        return;
      }
      setProduct({ ...product, [name]: file });
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setProduct({ ...product, [name]: value });
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('gambar', product.gambar);
      formData.append('category_id', parseInt(product.category_id));
      formData.append('subkategori_id', parseInt(product.subkategori_id));
      formData.append('nama_barang', product.nama_barang);
      formData.append('harga', parseInt(product.harga));
      formData.append('deskripsi', product.deskripsi);
      formData.append('diskon', parseInt(product.diskon));
      formData.append('bahan', product.bahan);
      formData.append('tags', product.tags);
      formData.append('sku', product.sku);
      formData.append('ukuran', product.ukuran);
      formData.append('warna', product.warna);
      formData.append('_method', 'PUT')

      const tokenObject = JSON.parse(adminToken);
      const token = tokenObject.access_token;

      const response = await axios.post(`${baseUrl}/produks/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success('Product updated Successfully');
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1500)
      } else {
        toast.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Failed to update product');
    }
  };

  if (error) {
    return <div className="update-product-error">{error}</div>;
  }

  return (
    <div className="update-product">
      <Toaster position="top-center" reverseOrder={false} />
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="gambar">Product Image (Image must be filled)</label>
          <input id="gambar" type="file" name="gambar" onChange={handleChange} required/>
          {previewImage && (
            <img src={previewImage} style={{ maxWidth: '200px', marginTop: '10px' }} alt="Product" />
          )}
        </div>
        <div>
          <label htmlFor="nama_barang">Product Name</label>
          <input id="nama_barang" type="text" name="nama_barang" value={product.nama_barang} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="harga">Price</label>
          <input id="harga" type="number" name="harga" value={product.harga} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="deskripsi">Description</label>
          <input id="deskripsi" type="text" name="deskripsi" value={product.deskripsi} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="diskon">Discount</label>
          <input id="diskon" type="number" name="diskon" value={product.diskon} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="bahan">Material</label>
          <input id="bahan" type="text" name="bahan" value={product.bahan} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="tags">Tags</label>
          <input id="tags" type="text" name="tags" value={product.tags} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="sku">SKU</label>
          <input id="sku" type="text" name="sku" value={product.sku} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ukuran">Size</label>
          <input id="ukuran" type="text" name="ukuran" value={product.ukuran} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="warna">Color</label>
          <input id="warna" type="text" name="warna" value={product.warna} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="category_id">Category Id</label>
          <input id="category_id" type="number" name="category_id" value={product.category_id} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="subkategori_id">Subcategory Id</label>
          <input id="subkategori_id" type="number" name="subkategori_id" value={product.subkategori_id} onChange={handleChange} />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProduct;
