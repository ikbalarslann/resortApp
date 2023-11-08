import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import HostHeader from "../components/headers/HostHeader";

const HostLayout = () => {
  return (
    <>
      <HostHeader />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default HostLayout;
