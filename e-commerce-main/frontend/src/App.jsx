import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './pages/LoginPage';
import PrivateRoute from './utils/PrivateRoute';
import ProductPage from './pages/ProductPage';
import { AuthProvider } from './context/authContext';
import { CartProvider } from './context/cartContext';

import Newheader from './components/navbar/index';
import RegisterForm from './pages/RegisterPage';
import PublicRoute from './utils/PublicRoute';
import Categories from './components/categories/categories';
import OrderHistory from './pages/OrderHistoryPage';
import Cart from './pages/Cart';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Newheader />
          <Categories />
          <Routes>
            <Route path="/" exact element={<PublicRoute outlet={<HomePage />} />} />
            <Route
              path="product/:id"
              exact
              element={<PublicRoute outlet={<ProductPage />} />}
            />
            <Route path="login" element={<LoginForm />} />
            <Route path="logout" />
            <Route path="register" element={<PublicRoute outlet={<RegisterForm />} />} />
            <Route
              path="orderHistory"
              element={<PrivateRoute outlet={<OrderHistory />} />}
            />
            <Route path="Cart" element={<PublicRoute outlet={<Cart />} />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
