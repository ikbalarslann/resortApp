import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/apis/usersApiSlice";
import { logout } from "../../slices/authSlice";
import { setDate } from "../../slices/searchbars/dateSlice";
import { setProperties } from "../../slices/properties/propertiesSlice";
import { setLocation } from "../../slices/searchbars/locationSlice";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./scss/userHeader.scss";

const UserHeader = () => {
  //dropdown menu
  const [dropdownHidden, setDropdownHidden] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogoClick = () => {
    handleToggleClick();
    dispatch(setDate(null));
    dispatch(setProperties({ properties: [] }));
    dispatch(setLocation(null));
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 760) {
        const toggle = document.querySelector(".nav__toggle");
        const navLinks = document.querySelector(".nav__links");
        setIsMobile(true);

        navLinks.classList.add("hide");
        toggle.classList.remove("hide");
      } else {
        const toggle = document.querySelector(".nav__toggle");
        const navLinks = document.querySelector(".nav__links");
        setIsMobile(false);

        navLinks.classList.remove("hide");
        toggle.classList.add("hide");
      }
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleToggleClick = () => {
    if (!isMobile) return;
    const nav = document.querySelector(".nav__links");

    nav.classList.toggle("hide");
  };

  return (
    <header>
      <div className="nav">
        <div className="nav__toggle-parent">
          <h1>
            <Link to="/user" onClick={handleLogoClick} className="nav__logo">
              Resort
            </Link>
          </h1>

          <div className="nav__toggle" onClick={handleToggleClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="nav__links">
          <Link
            to="/user/shoppingCard"
            className="nav__links-link"
            onClick={handleToggleClick}
          >
            Shopping Card
          </Link>
          <Link
            to="/user/wishlist"
            className="nav__links-link"
            onClick={handleToggleClick}
          >
            Wish List
          </Link>
          <Link
            to="/user/bookings"
            className="nav__links-link"
            onClick={handleToggleClick}
          >
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
