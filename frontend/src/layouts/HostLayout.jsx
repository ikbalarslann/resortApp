import { Outlet } from "react-router-dom";
import HostHeader from "../components/headers/HostHeader";
import Footer from "../components/Footer";
import HostSidebar from "../components/headers/host/HostSidebar";

const HostLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HostHeader />
      <div style={{ display: "flex", flex: 1, position: "relative" }}>
        <HostSidebar />
        <div style={{ flex: 1, position: "relative" }}>
          <div style={{ marginBottom: "4vh", marginTop: "2vh" }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HostLayout;
