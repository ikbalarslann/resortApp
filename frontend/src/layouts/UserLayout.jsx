import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import UserHeader from "../components/headers/UserHeader";
import Footer from "../components/Footer";

const UserLayout = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <UserHeader />
      <div style={{ flex: 1, position: "relative" }}>
        <div style={{ marginBottom: "4vh" }}>
          <Container className="my-2">
            <Outlet />
          </Container>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default UserLayout;
