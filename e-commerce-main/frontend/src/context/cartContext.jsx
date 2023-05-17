import React, { useEffect, useContext } from 'react';
import AuthContext from './authContext';

const CartContext = React.createContext('');

export default CartContext;

export function CartProvider({ children }) {
  const [cartProductSeller, setCartProductSeller] = React.useState(() =>
    localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  );

  let accessToken = '';
  if (localStorage.getItem('authTokens') !== null) {
    accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
  }

  const addToCart = (e) => {
    if (accessToken) {
      console.log('access token true');
    } else {
      const newcart = cartProductSeller;
      newcart.push({
        product_id: e.target.dataset.productid,
        seller_id: e.target.dataset.sellerid,
      });
      setCartProductSeller(newcart);
      console.log(cartProductSeller);
    }
    console.log(e);
  };

  const fetchCartData = async () => {
    const responce = await fetch(
      'http://127.0.0.1:8000/products/api/product/cartItems/',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setCartProductSeller(data);
      localStorage.setItem('cart', JSON.stringify(data));
    }
  };

  const updateStoredData = () => {
    localStorage.setItem('cart', JSON.stringify(cartProductSeller));
  };

  useEffect(() => {
    if (accessToken) {
      fetchCartData();
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      updateStoredData();
    }
  }, [cartProductSeller]);

  const contextData = {
    cartProductSeller,
    addToCart,
  };

  return <CartContext.Provider value={contextData}>{children}</CartContext.Provider>;
}
