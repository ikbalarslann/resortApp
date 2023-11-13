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

const UserHeader = () => {
  //dropdown menu
  const [dropdownHidden, setDropdownHidden] = useState(true);

  const toggleDropdown = () => {
    setDropdownHidden(!dropdownHidden);
  };

  // rest of the code
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
      <div className="nav">
        <h1>
          <Link
            to="/user"
            onClick={() => handleLogoClick()}
            className="nav__logo"
          >
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
          <Link to="/user/bookings" className="nav__links-link">
            My Bookings
          </Link>
          <div className="nav__user">
            <h5 className="nav__user-name" onClick={toggleDropdown}>
              User: {userInfo.name}
            </h5>
            {!dropdownHidden && (
              <div className="dropdown-menu">
                <Link to="/profile" className="nav__links-link">
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={logoutHandler}
                  className="nav__links-link"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default UserHeader;
