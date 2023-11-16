import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/apis/usersApiSlice";
import { useHlogoutMutation } from "../../slices/apis/hostsApiSlice";
import { logout } from "../../slices/authSlice";
import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./scss/userHeader.scss";

const DefaultHeader = () => {
  const [dropdownHidden, setDropdownHidden] = useState(true);
  const [dropdownHiddenHost, setDropdownHiddenHost] = useState(true);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownHidden(!dropdownHidden);
  };
  const toggleDropdownHost = () => {
    setDropdownHiddenHost(!dropdownHiddenHost);
  };

  const dispatch = useDispatch();

  const handleLogoClick = () => {
    dispatch(setDate(null));
    dispatch(setProperties({ properties: [] }));
    dispatch(setLocation(null));
  };

  const [HostlogoutApiCall] = useHlogoutMutation();
  const [logoutApiCall] = useLogoutMutation();

  useEffect(() => {
    const UserLogout = async () => {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout({ type: "user" }));
        navigate("/");
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
      }
    };

    const HostLogout = async () => {
      try {
        await HostlogoutApiCall().unwrap();
        dispatch(logout({ type: "host" }));
        navigate("/");
        window.scrollTo(0, 0);
      } catch (err) {
        console.error(err);
      }
    };

    UserLogout();
    HostLogout();
  }, []);

  return (
    <header>
      <div className="nav">
        <h1>
          <Link to="/" onClick={() => handleLogoClick()} className="nav__logo">
            Resort
          </Link>
        </h1>
        <div className="nav__links">
          <Link to="/user/shoppingCard" className="nav__links-link">
            Shopping Card
          </Link>
          <Link to="/user/wishlist" className="nav__links-link">
            Wish List
          </Link>

          <div className="nav__user">
            <h5 className="nav__user-name" onClick={toggleDropdownHost}>
              Host
            </h5>
            {!dropdownHiddenHost && (
              <div className="dropdown-menu">
                <Link to="/hostLogin" className="nav__links-link">
                  Host Login
                </Link>
                <Link to="/hostRegister" className="nav__links-link">
                  Host Register
                </Link>
              </div>
            )}
          </div>
          <div className="nav__user">
            <h5 className="nav__user-name" onClick={toggleDropdown}>
              User
            </h5>
            {!dropdownHidden && (
              <div className="dropdown-menu">
                <Link to="/login" className="nav__links-link">
                  Login
                </Link>
                <Link to="/register" className="nav__links-link">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default DefaultHeader;
