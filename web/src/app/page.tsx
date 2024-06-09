"use client";
import Link from "next/link";
import { Container, Row, Col, Card } from "react-bootstrap";
export default function Home() {
  return (
    <>
      <Container>
        <Row className="my-5">
          <Col>
            <h1 className=" text-center">OUR CONTENTS</h1>
          </Col>
        </Row>
        <Row className="flex flex-col md:flex-row justify-center">
          <Col md={6} className="mb-4 md:mb-0">
            <Link href="/content/article" className=" no-underline">
              <Card className="text-center">
                <Card.Img
                  variant="top"
                  src="thumbnail-artikel2.png"
                  className="mx-auto"
                />
                <Card.Body className="flex flex-col justify-center items-center">
                  <Card.Title className="text-pink">Articles</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
          <Col md={6} className="mb-4 md:mb-0">
            <Link href="/content/video" className=" no-underline">
              <Card className="text-center">
                <Card.Img
                  variant="top"
                  src="thumbnail-video1.png"
                  className="mx-auto"
                />
                <Card.Body className="flex flex-col justify-center items-center">
                  <Card.Title className="text-pink">Videos</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}
