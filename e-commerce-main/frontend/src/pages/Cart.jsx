import React from 'react';
import { Container, Row } from 'react-bootstrap';
import './OrderHistoryPage.scss';

function OrderHistory() {
  let accessToken = '';
  if (localStorage.getItem('authTokens')) {
    accessToken = JSON.parse(localStorage.getItem('authTokens')).access;
  }

  let cartData = '';
  if (localStorage.getItem('cart')) {
    cartData = JSON.parse(localStorage.getItem('cart'));
  }
  console.log(cartData);

  const [historyData, setHistoryData] = React.useState([]);

  const fetchHistory = async () => {
    const responce = await fetch(
      'http://127.0.0.1:8000/products/api/product/cartItems/full/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(`${cartData}`),
      },
    );
    const data = await responce.json();
    console.log('data:', data);
    if (responce.status === 200) {
      setHistoryData(data);
    } else {
      console.log('something went wrong');
    }
  };

  React.useEffect(() => {
    if (historyData.length === 0) {
      fetchHistory();
    }
  }, []);

  React.useEffect(() => {
    console.log(historyData);
  }, [historyData]);

  return (
    <Container>
      <Row>
        <h1>Order History</h1>
        {historyData.map((item) => {
          return (
            <div key={item.id} className="col-md-12 one-item">
              <div className="row">
                <div className="col-md-12">{item.order_id}</div>
              </div>
              <div className="row">
                <div className="col-md-4 product-thumbnail">
                  <img
                    className="product_thumb"
                    src={`http://127.0.0.1:8000${item.image[0].file}`}
                    alt={item.product_title}
                  />
                </div>
                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">{item.product_title}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">{item.item_price}</div>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="row">
                    <div className="col-md-12">{item.order_status}</div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">{item.seller_name}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">{item.created_at}</div>
              </div>
            </div>
          );
        })}
      </Row>
    </Container>
  );
}

export default OrderHistory;
