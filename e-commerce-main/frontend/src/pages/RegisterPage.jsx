import React, { useContext } from 'react';
import { Form, Container, Row, Button } from 'react-bootstrap';
import AuthContext from '../context/authContext';

function RegisterForm() {
  const { RegisterUser } = useContext(AuthContext);
  return (
    <Container>
      <Row className="justify-content-center">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <Form onSubmit={RegisterUser} method="POST">
            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" placeholder="Enter First name" name="fname" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formFirstName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Last name" name="lname" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="tel" placeholder="Phone Number" name="phone" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicContact">
              <Form.Label>Address</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Address"
                style={{ height: '100px' }}
                name="address"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </Row>
    </Container>
  );
}

export default RegisterForm;
