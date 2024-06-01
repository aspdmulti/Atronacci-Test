import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
export default function Home() {
  return (
    <Container>
      <Row className="my-5">
        <Col>
          <h1>Welcome to Next.js with Bootstrap</h1>
          <p className="lead">
            This is an example of using Bootstrap with a Next.js application.
          </p>
          <Button variant="primary">Learn More</Button>
        </Col>
      </Row>
    </Container>
  );
}
