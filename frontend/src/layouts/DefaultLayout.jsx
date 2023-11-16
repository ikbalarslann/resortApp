import "react-toastify/dist/ReactToastify.css";
import DefaultHeader from "../components/headers/DefaultHeader";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const DefaultLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <DefaultHeader />
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ marginBottom: "4vh" }}>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default DefaultLayout;
