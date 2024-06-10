// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const ProductDetail = () => {
//   const { productId } = useParams(); 
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`http://20.106.61.185:8006/api/produks/${productId}`);  // Ambil data berdasarkan ID
//         const data = await response.json();
//         if (data) {
//           setProduct(data);
//         } else {
//           console.error('Produk tidak ditemukan');
//         }
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   if (!product) {
//     return <div>Produk tidak ditemukan</div>;
//   }

//   return (
//     <div>
//       <h2>{product.nama_barang}</h2>
//       <p>{product.deskripsi}</p>
//       <p>Rp. {product.harga}</p>
//     </div>
//   );
// };

// export default ProductDetail;
