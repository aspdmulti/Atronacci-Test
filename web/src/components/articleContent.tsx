"use client";

import { axiosInstance } from "@/axios/axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Row, Pagination } from "react-bootstrap";
import { ArticleCard } from "./articleCard";
import Link from "next/link";
import moment from "moment";
import { useSelector } from "react-redux";
import LoadingPage from "./loading";

export interface Article {
  id: string;
  title: string;
  summary: string;
  imgUrl: string;
  createdAt: string;
}
interface User {
  email: string;
  name: string;
  membership: string;
}
interface RootState {
  auth: User;
}

function ArticleComponent() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const userSelector = useSelector((state: RootState) => state.auth);
  const fetchArticles = () => {
    axiosInstance()
      .get("/article/page/" + page)
      .then((res) => {
        const formattedArticles = res.data.result.map((article: Article) => ({
          ...article,
          createdAt: moment(article.createdAt).format("DD MMMM YYYY"),
        }));
        setArticles(formattedArticles);
        setPageCount(res.data.pageCount);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const handlePageChange = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(pageNumber);
  };

  return (
    <Container className="flex flex-col items-center justify-center">
      <Row className="my-5">
        <Col>
          <h1 className=" text-center">ARTICLES</h1>
        </Col>
      </Row>
      <Row className="flex flex-col justify-center items-center">
        {articles.map((article, key) => (
          <ArticleCard {...article} key={key} />
        ))}
      </Row>
      {userSelector.membership === "premium" ? (
        <>
          <Pagination className="mx-auto">
            <Pagination.First
              onClick={() => handlePageChange(1)}
              disabled={page === 1}
            />
            <Pagination.Prev
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            />
            {[...Array(pageCount)].map((_, idx) => (
              <Pagination.Item
                key={idx + 1}
                active={idx + 1 === page}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageChange(page + 1)}
              disabled={page === pageCount}
            />
            <Pagination.Last
              onClick={() => handlePageChange(pageCount)}
              disabled={page === pageCount}
            />
          </Pagination>
        </>
      ) : (
        <Row className="my-3 w-full flex flex-col justify-center items-center">
          <Col md={6}>
            <Link href="/membership">
              <Button className="w-full">
                UPGRADE YOUR MEMBERSHIP FOR MORE CONTENTS
              </Button>
            </Link>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ArticleComponent;
