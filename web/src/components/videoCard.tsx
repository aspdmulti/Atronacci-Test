import { Button, Card, Col } from "react-bootstrap";
import Link from "next/link";
import { Video } from "./videoContent";
export const VideoCard: React.FC<Video> = ({
  videoUrl,
  createdAt,
  title,
  summary,
  id,
}) => {
  return (
    <Link href={"video/" + id} className=" no-underline">
      <Card className="text-center">
        <Card.Body className="flex flex-col justify-center items-center gap-3">
          <Card.Title className="text-pink">{title}</Card.Title>
          <div className=" block w-full text-right">
            <Card.Text>posted at {createdAt}</Card.Text>
          </div>
          <iframe className="w-full aspect-video" src={videoUrl}></iframe>
          <Card.Text className=" text-justify">
            {summary.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};
