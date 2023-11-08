import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";

import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";

const DefaultHeader = () => {
  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(setDate(null));
    dispatch(setProperties({ properties: [] }));
    dispatch(setLocation(null));
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand onClick={() => handleLogoClick()}>
              Resort
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <>
                <NavDropdown title="Hosts" id="hosts">
                  <LinkContainer to="hostRegister">
                    <NavDropdown.Item>Sign Up</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="hostLogin">
                    <NavDropdown.Item>Sign In</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>

                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaSignInAlt /> Sign In
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>
                    <FaSignOutAlt /> Sign Up
                  </Nav.Link>
                </LinkContainer>
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default DefaultHeader;
