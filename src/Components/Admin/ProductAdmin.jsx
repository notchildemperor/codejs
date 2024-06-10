import React, { useState } from 'react';
import './ProductAdmin.css';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

const ProductAdmin = () => {
  const [file, setFile] = useState(null);
  const url = process.env.REACT_APP_BASEURL;
  const [productData, setProductData] = useState({
    category_id: '',
    subkategori_id: '',
    nama_barang: '',
    gambar: null,
    deskripsi: '',
    harga: '',
    diskon: '',
    bahan: '',
    tags: '',
    sku: '',
    ukuran: '',
    warna: ''
  });

  const idCategories = [
    { value: '1', label: 'Baju' },
    { value: '2', label: 'Celana' },
    { value: '3', label: 'Sepatu' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
     if ((name === 'harga' || name === 'diskon') && value.length > 6){
      return;
     }
    setProductData({ ...productData, [name]: value });
  };

  const handleImageChange = (e) => {
    setProductData({ ...productData, gambar: e.target.files[0] });
    setFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem(`token`);
    const tokenObject = JSON.parse(accessToken);
    const token = tokenObject.access_token;
    console.log(token);

    const { gambar, harga, nama_barang, deskripsi, sku, category_id, subkategori_id } = productData;
    if (!gambar || !harga || !nama_barang || !deskripsi || !sku || !category_id || !subkategori_id) {
      alert('Mohon isi semua input');
      return;
    }
    const formData = new FormData();
    formData.append('gambar', productData.gambar);
    formData.append('harga', productData.harga);
    formData.append('diskon', productData.diskon);
    formData.append('nama_barang', productData.nama_barang);
    formData.append('deskripsi', productData.deskripsi);
    formData.append('bahan', productData.bahan);
    formData.append('tags', productData.tags);
    formData.append('sku', productData.sku);
    formData.append('ukuran', productData.ukuran);
    formData.append('warna', productData.warna);
    formData.append('category_id', productData.category_id);
    formData.append('subkategori_id', productData.subkategori_id);

    try {
      const response = await axios.post(url+ '/produks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Product uploaded:', response.data);
      toast.success('Product uploaded Successfully');
        setTimeout(() => {
          window.location.href = '/admin/dashboard';
        }, 1500)
      setProductData({
        category_id: '',
        subkategori_id: '',
        nama_barang: '',
        gambar: null,
        deskripsi: '',
        harga: '',
        diskon: '',
        bahan: '',
        tags: '',
        sku: '',
        ukuran: '',
        warna: ''
      });
      setFile(null);
    } catch (error) {
      console.error('Error uploading product:', error);
      toast.error('Product uploaded failed');
    }
  };

  return (
    <div className='main-upload-product-admin'>
          <Toaster position="top-center" reverseOrder={false} />
         <h1>Upload Product</h1>
      <div className='right-page-product-upload'>
        <div className='right-page-upload-dashboard'>
          <form onSubmit={handleSubmit}>
            <div className='upload-image'>
              <p className='p-upload'>Add Image:</p>
              <input type='file' accept='image/png, image/jpeg, image/jpg' name='gambar' onChange={handleImageChange} />
              <div className='image-uploaded'>
                {file && <img src={file} alt='Uploaded' />}
              </div>
            </div>
            <div className="id-categori-id">
              <div className='upload-id'>
                <p className='p-upload'>Category Id:</p>
                <select name='category_id' value={productData.category_id} onChange={handleInputChange}>
                  <option value=''>Pilih Kategori</option>
                  {idCategories.map((idCategory) => (
                    <option key={idCategory.value} value={idCategory.value}>{idCategory.label}</option>
                  ))}
                </select>
                <p className='p-upload'>Subcategory Id:</p>
                <select name='subkategori_id' value={productData.subkategori_id} onChange={handleInputChange}>
                  <option value=''>Pilih Subkategori</option>
                  {idCategories.map((idCategory) => (
                    <option key={idCategory.value} value={idCategory.value}>{idCategory.label}</option>
                  ))}
                </select>
                <div className='upload-description'>
              <p className='p-upload'>Add Description:</p>
              <input className='input-description' type='text' name='deskripsi' value={productData.deskripsi} onChange={handleInputChange} placeholder='Description' />
            </div>
            <div className='upload-title'>
              <p className='p-upload'>Add Title:</p>
              <input className='input-title' type='text' name='nama_barang' value={productData.nama_barang} onChange={handleInputChange} placeholder='Title' />
            </div>
            <div className='upload-price'>
              <p className='p-upload'>Add Tags:</p>
              <input className='input-tags' type='text' name='tags' value={productData.tags} onChange={handleInputChange} placeholder='e.g. : Celana, Baju' />
            </div>
              </div>
            </div>
            <div className="price-diskon">
              <div className='upload-price'>
                <p className='p-upload'>Material:</p>
                <input className='input-input-sama' type='text' name='bahan' value={productData.bahan} onChange={handleInputChange} placeholder='e.g. : Nylon' />
              </div>
              <div className='upload-price'>
                <p className='p-upload'>Material Color:</p>
                <input className='input-input-sama' type='text' name='warna' value={productData.warna} onChange={handleInputChange} placeholder='e.g. : Black, White' />
              </div>
            </div>
            <div className="price-diskon">
              <div className='upload-price'>
                <p className='p-upload'>Add Price:</p>
                <input className='input-input-sama' type='number' name='harga' value={productData.harga} onChange={handleInputChange} placeholder='Rp' min={0} maxLength={7} />
              </div>
              <div className='upload-price'>
                <p className='p-upload'>Add Discount:</p>
                <input className='input-input-sama' type='number' name='diskon' value={productData.diskon} onChange={handleInputChange} placeholder='Rp' min={0} />
              </div>
            </div>
            <div className="price-diskon">
              <div className='upload-price'>
                <p className='p-upload'>SKU:</p>
                <input className='input-input-sama' type='text' name='sku' value={productData.sku} onChange={handleInputChange} placeholder='e.g. : 120912as' />
              </div>
              <div className='upload-price'>
                <p className='p-upload'>Add Size:</p>
                <input className='input-input-sama' type='text' name='ukuran' value={productData.ukuran} onChange={handleInputChange} placeholder='e.g. : M, L, XL' />
              </div>
            </div>
            <button type='submit' className='upload-button-produk'>Upload Product</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
