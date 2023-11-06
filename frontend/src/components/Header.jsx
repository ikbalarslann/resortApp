// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { useHlogoutMutation } from "../slices/hostsApiSlice";
import { logout } from "../slices/authSlice";

const Header = () => {
  const { userInfo, hostInfo } = useSelector((state) => state.auth);
  const { date } = useSelector((state) => state.date);
  const { properties } = useSelector((state) => state.properties);
  const { location } = useSelector((state) => state.location);

  const loggedInUserType = userInfo ? "user" : hostInfo ? "host" : null;

  const [logoutApiCall] =
    loggedInUserType == "user" ? useLogoutMutation() : useHlogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout({ type: loggedInUserType }));
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoClick = () => {
    dispatch(date({ date: null }));
    dispatch(properties({ properties: [] }));
    dispatch(location({ location: null }));
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand onClick={() => handleLogoClick}>Resort</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <LinkContainer to="/wishlist">
                    <Nav.Link>Wish List</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/shoppingCard">
                    <Nav.Link>Shopping Card</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Discover" id="discover">
                    <LinkContainer to="/mybookings">
                      <NavDropdown.Item>My Bookings</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title={`User : ${userInfo.name}`} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : hostInfo ? (
                <>
                  <NavDropdown title="Management" id="management">
                    <LinkContainer to="/myProperties">
                      <NavDropdown.Item>Property</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/hostBookings">
                      <NavDropdown.Item>Bookings</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/priceandavalibility">
                      <NavDropdown.Item>Price & Avalibility</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/analytics">
                      <NavDropdown.Item>Analytics</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title={`Host : ${hostInfo.name}`} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown title="Hosts" id="hosts">
                    <LinkContainer to="/hostRegister">
                      <NavDropdown.Item>Sign Up</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/hostLogin">
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
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
