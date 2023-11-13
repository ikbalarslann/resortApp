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

//host routes
import HostLogin from "./pages/host/HostLogin.jsx";
import HostRegister from "./pages/host/HostRegister.jsx";
import HostProperties from "./pages/host/HostProperties.jsx";
import CreateProperty from "./pages/host/CreateProperty.jsx";
import EditProperty from "./pages/host/EditProperty.jsx";
import HostBookings from "./pages/host/HostBookings.jsx";
import PriceAvaliability from "./pages/host/PriceAvaliability.jsx";
import PriceAvaliabilityEdit from "./pages/host/PriceAvaliabilityEdit.jsx";
import Analytics from "./pages/host/Analytics.jsx";
import PropertyAnalytics from "./pages/host/PropertyAnalytics.jsx";

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
              path: "avalibility/:id",
              element: <PriceAvaliabilityEdit />,
            },
            {
              path: "analytics",
              element: <Analytics />,
            },
            {
              path: "analytics/:propertyId",
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
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
