import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, Row, Button } from 'react-bootstrap';
import AuthContext from '../context/authContext';

function LoginForm() {
  const { loginUser } = useContext(AuthContext);
  return (
    <Container>
      <Row className="justify-content-center">
        <div className="col-md-6 col-sm-6 col-xs-6">
          <Form onSubmit={loginUser} method="POST">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" name="password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Link to="/register">Register</Link>
        </div>
      </Row>
    </Container>
  );
}

export default LoginForm;
