import { Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import DefaultHeader from "../components/headers/DefaultHeader";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <DefaultHeader />
      <Container className="my-2">
        <Outlet />
      </Container>
    </>
  );
};

export default DefaultLayout;
