import { Navbar, Container, Nav, NavbarBrand } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import { getLoggedUser } from "../../../redux/users.Redux";

const NavBar = () => {

  const loggedUser = useSelector(getLoggedUser);

  return (
    <Navbar bg="primary" variant="dark" expand="md" className="rounded-2 mt-2 mb-4">
      <Container>
        <Navbar.Brand>Ads.app</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        
            {loggedUser ? (
              <>
              <Nav.Link as={NavLink} to="/ad/add">Add ad</Nav.Link>
              <Nav.Link as={NavLink} to="/logout">Sign out</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Sign in</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Sign up</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;