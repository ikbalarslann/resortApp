import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const UserLayout = () => {
  return (
    <>
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default UserLayout;
