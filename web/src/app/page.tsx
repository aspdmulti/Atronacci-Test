"use client";
import NavbarComponent from "../components/navbar";
import Image from "next/image";
import { Container, Row, Col, Button, SSRProvider } from "react-bootstrap";
export default function Home() {
  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <h1 className=" text-center">Welcome to Next.js with Bootstrap</h1>
            <p className="lead">
              This is an example of using Bootstrap with a Next.js application.
            </p>
            <Button variant="primary">Learn More</Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
