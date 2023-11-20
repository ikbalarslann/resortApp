import { Outlet } from "react-router-dom";
import HostHeader from "../components/headers/HostHeader";
import Footer from "../components/Footer";
import HostSidebar from "../components/headers/host/HostSidebar";
import HostMobileLayout from "./HostMobileLayout";
import { useEffect, useState } from "react";

const HostLayout = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 760) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
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

  return isMobile ? (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <HostMobileLayout />
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ marginBottom: "4vh" }}>
          <Outlet />
        </div>

        <Footer />
      </div>
    </div>
  ) : (
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
