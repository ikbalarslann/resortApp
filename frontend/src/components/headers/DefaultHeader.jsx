import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/apis/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./scss/userHeader.scss";

const DefaultHeader = () => {
  //dropdown menu
  const [dropdownHidden, setDropdownHidden] = useState(true);
  const [dropdownHiddenHost, setDropdownHiddenHost] = useState(true);

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
