import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NewCollections.css';

const Category = () => {
  const url = process.env.REACT_APP_BASEURL;
  const imgUrl = process.env.REACT_APP_BASEIMG;
  const [categories, setCategories] = useState([]); //state dengan array kosong untuk menyimpan data

  const getDataCategories = async () => { //mengambil data dari api categories
    try {
      const response = await axios.get(url+ '/categories');
      const dataCategories = response.data;
      setCategories(dataCategories.data);
    } catch (error) { //menangkap eror
      console.log('error:', error);
    }
  };

  useEffect(() => { //menjalankan getDataCategories saat komponen pertama dirender
    getDataCategories();
  }, []); //array kosong, untuk effect ini hanya dijalankan sekali

  return (
    <div className="hahaha-main">
      <div className='new-category'>
      <h1>CATEGORY</h1>
      </div>
      <div className="mainmain">
        <div className="main-card-category">
        <div className="card-category">
          {categories.map((category) => { //parameter callback dengan metode map
            if (category.id === 5) { //filter berdasarkan id (5)
              return (
                <div className="colll-3" key={category.id}>
                  <Link style={{textDecoration: 'none', color: 'black'}} to='/shirt'>
                    <CardCategory
                      title={category.nama_kategori}
                      desc={category.deskripsi}
                      image={`${imgUrl}/${category.gambar}`}
                    />
                  </Link>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="main-card-category">
        <div className="card-category">
          {categories.map((category) => {
            if (category.id === 6) {
              return (
                <div className="colll-3" key={category.id}>
                  <Link style={{textDecoration: 'none', color: 'black'}} to='/pants'>
                    <CardCategory
                      title={category.nama_kategori}
                      desc={category.deskripsi}
                      image={`${imgUrl}/${category.gambar}`}
                    />
                  </Link>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      <div className="main-card-category">
        <div className="card-category">
          {categories.map((category) => {
            if (category.id === 7) {
              return (
                <div className="colll-3" key={category.id}>
                  <Link style={{textDecoration: 'none', color: 'black'}} to='/shoes'>
                    <CardCategory
                      title={category.nama_kategori}
                      desc={category.deskripsi}
                      image={`${imgUrl}/${category.gambar}`}
                    />
                  </Link>
                </div>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
      </div>
      
    
    </div>
    
  );
};

function CardCategory(props) {
  return (
    <div className="pppp">
      <div className="main-card-category-main">
        <div className="image-category">
          <img src={props.image} alt="" />
      </div>
      </div>
      <div className="apalah">
        <div className="image-didalam-image">
          <img src={props.image} />
        </div>
        <div className="yahaha">
          <div className="title-card-category">{props.title}</div>
          <div className="deskripsi-category">{props.desc}</div>
        </div>
      
      </div>
    </div>
  );
}

export default Category;
