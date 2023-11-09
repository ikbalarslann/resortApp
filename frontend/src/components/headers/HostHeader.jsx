import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHlogoutMutation } from "../../slices/apis/hostsApiSlice";
import { logout } from "../../slices/authSlice";
import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";

const HostHeader = () => {
  const { hostInfo } = useSelector((state) => state.auth);

  const [logoutApiCall] = useHlogoutMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout({ type: "host" }));
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
          <LinkContainer to="/host">
            <Navbar.Brand onClick={() => handleLogoClick()}>
              Resort
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
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
                <NavDropdown
                  title={hostInfo && `Host : ${hostInfo.name}`}
                  id="username"
                >
                  <LinkContainer to="/host/profile">
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

export default HostHeader;
