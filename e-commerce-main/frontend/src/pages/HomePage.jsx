/* eslint-disable prefer-template */
import React from 'react';
import './HomePage.scss';
import { Button, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartContext from '../context/cartContext';

function HomePage() {
  const [productsData, setProductsData] = React.useState([]);
  const navigate = useNavigate();
  const notify = (message) => toast(message);
  const { addToCart } = React.useContext(CartContext);
  const fetchProducts = async () => {
    const responce = await fetch('http://127.0.0.1:8000/products/api/allProducts/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setProductsData(data);
    } else {
      console.log('something went wrong');
    }
  };

  React.useEffect(() => {
    if (productsData.length === 0) {
      fetchProducts();
    }
  }, []);

  React.useEffect(() => {
    console.log('effect run');
  }, [productsData]);

  function AddToWishlist(e) {
    const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
    const Wishlist = async (e) => {
      e.preventDefault();
      const responce = await fetch(
        'http://127.0.0.1:8000/products/api/product/wishlist/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: e.target.id,
          }),
        },
      );
      const data = await responce.json();
      console.log('data:', data);
      if (responce.status === 200) {
        if (data.message === 'added') {
          notify('Added to wishlist');
        } else if (data.message === 'removed') {
          notify('Removed from Wishlist');
        }
      } else {
        console.log('something went wrong');
      }
    };

    Wishlist(e);
  }

  function productView(e) {
    console.log('productView' + e.target.id);
    navigate({
      pathname: `product/${e.target.id}`,
    });
  }

  return (
    <Container>
      <Row>
        <h1>Homepage</h1>
        <ToastContainer />
        {productsData.map((item) => {
          return (
            <div key={item.id} className="col-md-4 col-sm-4 col-xs-6 product-box" min>
              <div className="inner-product-box">
                <div className="product-box-details">
                  <div className="product-image-section">
                    <div className="prucuct-wishlist-buttton">
                      <Button id={item.id} onClick={(e) => AddToWishlist(e)}>
                        wishlist
                      </Button>
                    </div>
                    <div className="product-image">
                      <img
                        className="product-image"
                        src={'http://127.0.0.1:8000' + item.images[0].file}
                        alt={item.title}
                      />
                    </div>
                  </div>
                  <div className="product-info">
                    <div className="product-title">{item.title}</div>
                    <div className="product-price">{item.price}</div>
                  </div>
                </div>
                <div className="pruduct-button-wrapper">
                  <Button id={item.id} onClick={(e) => productView(e)}>
                    View
                  </Button>
                  <Button
                    data-productid={item.id}
                    data-sellerid={item.currentSeller}
                    onClick={(e) => addToCart(e)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}

export default HomePage;
