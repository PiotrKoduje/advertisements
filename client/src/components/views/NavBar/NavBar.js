import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { useSelector} from "react-redux";
import { getLoggedUser } from "../../../redux/users.Redux";

const NavBar = () => {

  const loggedUser = useSelector(getLoggedUser);
  console.log("loggedUser from Redux:", loggedUser);
  
  return (
    <Navbar bg="primary" variant="dark" expand="md" className="rounded-2 mt-2 mb-4">
      <Container>
      <Navbar.Brand>
      {loggedUser && loggedUser.login ? `Hi ${loggedUser.login}` : 'Ads.app'}
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
        
            {loggedUser ? (
              <>
              <Nav.Link as={NavLink} to="/ads/add">Add ad</Nav.Link>
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