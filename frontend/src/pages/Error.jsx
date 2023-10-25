import { Link } from "react-router-dom";
import { Container, Row, Col, Alert } from "react-bootstrap";

const Error = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <Alert variant="danger">
            <h1>Oh no, this route doesn't exist!</h1>
            <p>
              You can go back to the home page by{" "}
              <Link to="/">clicking here</Link>.
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default Error;
