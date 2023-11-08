import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import UserHeader from "../components/headers/UserHeader";

const UserLayout = () => {
  return (
    <>
      <UserHeader />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default UserLayout;
