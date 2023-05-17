/* eslint-disable prefer-template */
import React from 'react';
import './ProductPage.scss';
import {
  Button,
  ButtonGroup,
  Container,
  Row,
  Carousel,
  CarouselItem,
  Form,
} from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductPage() {
  const [productData, setProductData] = React.useState({ id: -1, images: [] });
  const [productSellersData, setProductSellersData] = React.useState([]);
  const { id } = useParams();
  const notify = (message) => toast(message);
  const navigate = useNavigate();

  const fetchProduct = async () => {
    const responce = await fetch(
      `http://127.0.0.1:8000/products/api/product/?product_id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setProductData(data);
    } else {
      console.log('something went wrong');
    }
  };

  const fetchProductSellers = async () => {
    const responce = await fetch(
      `http://127.0.0.1:8000/products/api/product/sellers/?product_id=${id}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setProductSellersData(data);
    } else {
      console.log('something went wrong');
    }
  };

  React.useEffect(() => {
    console.log('lol hi 999**');
    fetchProduct();
    fetchProductSellers();
  }, []);

  React.useEffect(() => {
    console.log('effect re run');
  }, [productData, productSellersData]);

  function AddToWishlist(e) {
    const user = JSON.parse(localStorage.getItem('authTokens')).access;
    console.log('wishlist' + e.target.dataset.productid);
    const Wishlist = async (e) => {
      e.preventDefault();
      const responce = await fetch(
        'http://127.0.0.1:8000/products/api/product/wishlist/',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${user}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product: e.target.dataset.productid,
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

  function selectSeller(e) {
    console.log(e);
  }

  function buyProduct(e) {
    console.log(e);
    if (localStorage.getItem('authTokens') === null) {
      navigate('/login');
    } else {
      const accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
      console.log(e);

      const Buy = async (e) => {
        console.log();
        const responce = await fetch(
          'http://127.0.0.1:8000/products/api/product/order/',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([
              {
                product_id: e.target.dataset.productid,
                seller_id: e.target.dataset.sellerid,
              },
            ]),
          },
        );
        const data = await responce.json();
        if (responce.status === 200) {
          console.log('data:', data);
          window.location = data.payment_url;
        }
      };

      Buy(e);
    }
  }

  return (
    <Container>
      <Row>
        <ToastContainer />
        <h1>Product Page</h1>
        <div className="col-md-4">
          <Carousel variant="dark">
            {productData.images.map((item) => {
              return (
                <CarouselItem key={item.file}>
                  <img
                    className="d-block w-100"
                    src={'http://127.0.0.1:8000' + item.file}
                    alt="First slide"
                  />
                </CarouselItem>
              );
            })}
          </Carousel>
        </div>
        <div className="col-md-8">
          <div className="page-header">
            <h2>{productData.title}</h2>
          </div>
          <div className="Price-div">
            <span className="price">₹ {productData.price}</span>
          </div>
          <div className="sellerSelectDropdown">
            <Form.Select
              id="sellerSelect"
              onChange={(e) => selectSeller(e)}
              aria-label="Default select example">
              <option>Select Seller</option>
              {productSellersData.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.first_name}
                  </option>
                );
              })}
            </Form.Select>
          </div>
          <div className="ButtonsGroup">
            <ButtonGroup>
              <Button className="addToCartButton" productId={productData.id}>
                Add to Cart
              </Button>
              <Button
                className="buyButton"
                data-productId={productData.id}
                data-sellerId={productData.currentSeller}
                onClick={(e) => buyProduct(e)}>
                Buy Now
              </Button>
              <Button
                className="wishlist"
                data-productId={productData.id}
                onClick={(e) => AddToWishlist(e)}>
                Wishlist
              </Button>
            </ButtonGroup>
          </div>

          <div className="description">{productData.description}</div>
        </div>
      </Row>
    </Container>
  );
}

export default ProductPage;
