import { Button, Card, Col } from "react-bootstrap";
import Link from "next/link";
import { Article } from "./articleContent";
export const ArticleCard: React.FC<Article> = ({
  imgUrl,
  createdAt,
  title,
  summary,
  id,
}) => {
  return (
    <Col md={6} className="mb-4 md:mb-0">
      <Card className="text-center">
        <Card.Body className="flex flex-col justify-center items-center gap-3">
          <Card.Title className="text-pink">{title}</Card.Title>
          <div className=" block w-full text-right">
            <Card.Text>posted at {createdAt}</Card.Text>
          </div>
          <Card.Img
            variant="top"
            src={process.env.NEXT_PUBLIC_ARTICLE_IMAGE + imgUrl}
            className="mx-auto"
          />
          <Card.Text className=" text-justify">
            {summary.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Card.Text>
          <Link href={"article/" + id}>
            <Button>Read More</Button>
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};
