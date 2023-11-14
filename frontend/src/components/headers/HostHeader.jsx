import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useHlogoutMutation } from "../../slices/apis/hostsApiSlice";
import { logout } from "../../slices/authSlice";
import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./scss/hostHeader.scss";

const HostHeader = () => {
  //dropdown menu
  const [dropdownHidden, setDropdownHidden] = useState(true);

  const toggleDropdown = () => {
    setDropdownHidden(!dropdownHidden);
  };

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
      <div className="host-nav">
        <h1>
          <Link
            to="/host"
            onClick={() => handleLogoClick()}
            className="host-nav__logo"
          >
            Resort
          </Link>
        </h1>
        <div className="host-nav__links">
          <div className="host-nav__user">
            <h5 className="host-nav__user-name" onClick={toggleDropdown}>
              Host: {hostInfo.name}
            </h5>
            {!dropdownHidden && (
              <div className="dropdown-menu">
                <Link to="/profile" className="host-nav__links-link">
                  Profile
                </Link>
                <Link
                  to="/"
                  onClick={logoutHandler}
                  className="host-nav__links-link"
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
export default HostHeader;
