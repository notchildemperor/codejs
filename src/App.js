import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home'
import Category from './Components/NewCollections/Category';
import ProductDetail from './DetailProduk/DetailProduk';
import Shirt from './Pages/Shirt';
import Pants from './Pages/Pants';
import Shoes from './Pages/Shoes';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Register from './Pages/Register';
import Profile from './Pages/Profile';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Footer from './Components/Footer/Footer';
import LoginAdmin from './Pages/LoginAdmin';
import DashboardAdmin from './Pages/AdminDashboard';
import ProductAdmin from './Pages/AdminProduct';
import UpdateProduct from './Components/Admin/UpdateProduct';
import UploadProduct from './Pages/UploadAdmin';
import WhoCheckout from './Components/Admin/WhoCheckout';
import CheckoutHistory from './Pages/CheckoutHistory';
import Members from './Components/Admin/Members';

function App() {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
        {/* <Navbar/> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category' element={<Category />} />
            <Route path='/product/detail' element={<ProductDetail />} />
            <Route path='/shirt' element={<Shirt category="shirt" />} />
            <Route path='/pants' element={<Pants category="pants" />} />
            <Route path='/shoes' element={<Shoes category="shoes" />} />
            <Route path='/kids' element={<ShopCategory category="kid" />} />
            <Route path="/products" element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/history-checkout' element={<CheckoutHistory/>}/>
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/admin' element={<LoginAdmin />} />
            <Route path='/admin/product' element={<DashboardAdmin />} />
            <Route path='/admin/dashboard' element={<ProductAdmin />} />
            <Route path='/admin/update-product/:id' element={<UpdateProduct/>}/>
            <Route path='/admin/upload-product' element={<UploadProduct/>}/>
            <Route path='/admin/who-checkout' element={<WhoCheckout/>}/>
            <Route path='/admin/members' element={<Members/>}/>
          </Routes>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
