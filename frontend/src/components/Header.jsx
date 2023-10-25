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

  const loggedInUserType = userInfo ? "user" : hostInfo ? "host" : null;

  console.log("loggedInUserType :", loggedInUserType);

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

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Resort</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={`User : ${userInfo.name}`} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <LinkContainer to="/properties">
                      <NavDropdown.Item>Properties</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/mybookings">
                      <NavDropdown.Item>My Bookings</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : hostInfo ? (
                <>
                  <NavDropdown title={`Host : ${hostInfo.name}`} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                    <LinkContainer to="/myProperties">
                      <NavDropdown.Item>My Properties</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown title="Hosts" id="hosts">
                    <LinkContainer to="/hostRegister">
                      <NavDropdown.Item>Sign In</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/hostLogin">
                      <NavDropdown.Item>Sign Up</NavDropdown.Item>
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
