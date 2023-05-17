import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import './categories.css';
import clothing from '../../../resources/categories/clothing.webp';
import electronics from '../../../resources/categories/Electronics.webp';
import home from '../../../resources/categories/Home.webp';
import mobilecomputer from '../../../resources/categories/mobilecomputer.webp';

function Categories() {
  return (
    <Navbar bg="light" expand="lg" id="categories">
      <Container className="d-flex justify-content-center">
        <Nav className="d-flex justify-content-evenly flex-grow-1">
          <NavDropdown
            title={
              <div className="dropdown-head">
                <div>
                  <img
                    className="dropdown-thumbnail-image"
                    src={clothing}
                    alt="clothing category"
                  />
                </div>
                <p className="dropdown-text">Clothing</p>
              </div>
            }
            id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <div className="dropdown-head">
                <div>
                  <img
                    className="dropdown-thumbnail-image"
                    src={electronics}
                    alt="electronics category"
                  />
                </div>
                <p className="dropdown-text">Electronics</p>
              </div>
            }
            id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <div className="dropdown-head">
                <div>
                  <img
                    className="dropdown-thumbnail-image"
                    src={home}
                    alt="home category"
                  />
                </div>
                <p className="dropdown-text">Home</p>
              </div>
            }
            id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title={
              <div className="dropdown-head">
                <div>
                  <img
                    className="dropdown-thumbnail-image"
                    src={mobilecomputer}
                    alt="mobilecomputer category"
                  />
                </div>
                <p className="dropdown-text">Mobile/Computer</p>
              </div>
            }
            id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Categories;
