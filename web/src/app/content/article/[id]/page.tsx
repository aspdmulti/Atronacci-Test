"use client";

import { axiosInstance } from "@/axios/axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";

type PageProps = {
  params: {
    id: string;
  };
};

type Article = {
  title: string;
  content: string;
  imgUrl: string;
  createdAt: string;
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const [article, setArticle] = useState<Article>({
    title: "",
    content: "",
    imgUrl: "",
    createdAt: "",
  });

  const fetchArticlesById = () => {
    axiosInstance()
      .get("/article/" + id)
      .then((res) => {
        const articleData = res.data.result;
        setArticle({
          ...articleData,
          createdAt: moment(articleData.createdAt).format("DD-MMMM-YYYY"),
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchArticlesById();
  }, []);
  return (
    <Container className="flex flex-col justify-center items-center gap-3 bg-white max-w-screen-md my-5 rounded">
      <h1 className=" text-pink">{article.title}</h1>
      <h5>posted at {article.createdAt}</h5>
      <Image src={process.env.NEXT_PUBLIC_ARTICLE_IMAGE + article.imgUrl} />
      <div className=" text-justify">
        {article.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
};

export default Page;
