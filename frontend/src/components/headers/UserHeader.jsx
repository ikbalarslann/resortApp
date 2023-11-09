import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/apis/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";

const UserHeader = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useLogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout({ type: "user" }));
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoClick = () => {
    dispatch(setDate(null));
    dispatch(setProperties({ properties: [] }));
    dispatch(setLocation(null));
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/user">
            <Navbar.Brand onClick={() => handleLogoClick()}>
              Resort
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
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
                <NavDropdown
                  title={userInfo && `User : ${userInfo.name}`}
                  id="username"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
export default UserHeader;
