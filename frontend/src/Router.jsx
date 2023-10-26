import React from "react";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Property from "./pages/Property.jsx";
import Error from "./pages/Error.jsx";
import HostLogin from "./pages/HostLogin.jsx";
import HostRegister from "./pages/HostRegister.jsx";
import MyProperties from "./pages/MyProperties.jsx";
import CreateProperty from "./pages/CreateProperty.jsx";
import MyBookings from "./pages/MyBookings.jsx";
const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Test />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/properties",
          element: <Property />,
        },
        {
          path: "/hostlogin",
          element: <HostLogin />,
        },
        {
          path: "/hostregister",
          element: <HostRegister />,
        },
        {
          path: "/myProperties",
          element: <MyProperties />,
        },
        {
          path: "/createProperty",
          element: <CreateProperty />,
        },
        {
          path: "/myBookings",
          element: <MyBookings />,
        },

        {
          path: "",
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
