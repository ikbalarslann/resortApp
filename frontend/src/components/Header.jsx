// import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/apis/usersApiSlice";
import { useHlogoutMutation } from "../slices/apis/hostsApiSlice";
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
      navigate("/");
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
          {userInfo ? (
            <LinkContainer to="/user">
              <Navbar.Brand onClick={() => handleLogoClick()}>
                Resort
              </Navbar.Brand>
            </LinkContainer>
          ) : hostInfo ? (
            <LinkContainer to="/host">
              <Navbar.Brand onClick={() => handleLogoClick()}>
                Resort
              </Navbar.Brand>
            </LinkContainer>
          ) : (
            <LinkContainer to="/">
              <Navbar.Brand onClick={() => handleLogoClick()}>
                Resort
              </Navbar.Brand>
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <LinkContainer to="/user/wishlist">
                    <Nav.Link>Wish List</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/user/shoppingCard">
                    <Nav.Link>Shopping Card</Nav.Link>
                  </LinkContainer>
                  <NavDropdown title="Discover" id="discover">
                    <LinkContainer to="/user/bookings">
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
                    <LinkContainer to="/host/properties">
                      <NavDropdown.Item>Property</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/host/bookings">
                      <NavDropdown.Item>Bookings</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/host/avalibility">
                      <NavDropdown.Item>Price & Avalibility</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/host/analytics">
                      <NavDropdown.Item>Analytics</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title={`Host : ${hostInfo.name}`} id="username">
                    <LinkContainer to="/host/profile">
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
                    <LinkContainer to="/host/register">
                      <NavDropdown.Item>Sign Up</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/host/login">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>

                  <LinkContainer to="/user/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/user/register">
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
