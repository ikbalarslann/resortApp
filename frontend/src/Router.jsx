import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/main.scss";

//layouts
import App from "./layouts/App.jsx";
import DefaultLayout from "./layouts/DefaultLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import HostLayout from "./layouts/HostLayout.jsx";

//user routes
import Register from "./pages/user/Register.jsx";
import Profile from "./pages/user/Profile.jsx";
import Property from "./pages/user/Property.jsx";
import Login from "./pages/user/Login.jsx";
import UserBookings from "./pages/user/UserBookings.jsx";
import ShoppingCard from "./pages/user/ShoppingCard.jsx";
import WishList from "./pages/user/WishList.jsx";
import SingleProperty from "./pages/user/SingleProperty.jsx";

//host routes
import HostLogin from "./pages/host/HostLogin.jsx";
import HostRegister from "./pages/host/HostRegister.jsx";
import HostProperties from "./pages/host/HostProperties.jsx";
import CreateProperty from "./pages/host/CreateProperty.jsx";
import EditProperty from "./pages/host/EditProperty.jsx";
import HostBookings from "./pages/host/HostBookings.jsx";
import PriceAvaliability from "./pages/host/PriceAvaliability.jsx";
import PropertyAnalytics from "./pages/host/Analytics.jsx";
import HostProfile from "./pages/host/HostProfile.jsx";

//common routes
import Home from "./pages/Home.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Error from "./pages/Error.jsx";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "",
          element: <DefaultLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
            {
              path: "hostLogin",
              element: <HostLogin />,
            },
            {
              path: "hostRegister",
              element: <HostRegister />,
            },
            {
              path: "user/properties",
              element: <Property />,
            },
            {
              path: "user/properties/:propertyId",
              element: <SingleProperty />,
            },
            {
              path: "user/shoppingCard",
              element: <ShoppingCard />,
            },
            {
              path: "user/wishlist",
              element: <WishList />,
            },
          ],
        },

        {
          path: "user/",
          element: <UserLayout />,
          children: [
            {
              index: true,
              element: <Home />,
            },
            {
              path: "properties",
              element: <Property />,
            },
            {
              path: "properties/:propertyId",
              element: <SingleProperty />,
            },
            {
              path: "bookings",
              element: <UserBookings />,
            },
            {
              path: "shoppingCard",
              element: <ShoppingCard />,
            },
            {
              path: "wishlist",
              element: <WishList />,
            },
          ],
        },
        {
          path: "host/",
          element: <HostLayout />,
          children: [
            {
              index: true,
              element: <HostProperties />,
            },
            {
              path: "properties",
              element: <HostProperties />,
            },
            {
              path: "create",
              element: <CreateProperty />,
            },
            {
              path: "edit/:id",
              element: <EditProperty />,
            },
            {
              path: "bookings",
              element: <HostBookings />,
            },
            {
              path: "avalibility",
              element: <PriceAvaliability />,
            },

            {
              path: "analytics",
              element: <PropertyAnalytics />,
            },
          ],
        },
        {
          path: "/",
          element: <PrivateRoute />,
          children: [
            {
              path: "/profile",
              element: <Profile />,
            },
            {
              path: "/hprofile",
              element: <HostProfile />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
