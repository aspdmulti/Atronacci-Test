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

type Video = {
  title: string;
  summary: string;
  videoUrl: string;
  createdAt: string;
};

const Page: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  const [video, setVideo] = useState<Video>({
    title: "",
    summary: "",
    videoUrl: "",
    createdAt: "",
  });

  const fetchVideosById = () => {
    axiosInstance()
      .get("/video/" + id)
      .then((res) => {
        const videoData = res.data.result;
        setVideo({
          ...videoData,
          createdAt: moment(videoData.createdAt).format("DD-MMMM-YYYY"),
        });
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchVideosById();
  }, []);
  return (
    <Container className="flex flex-col justify-center items-center gap-3 bg-white max-w-screen-md my-5 rounded">
      <h1 className=" text-pink">{video.title}</h1>
      <h5>posted at {video.createdAt}</h5>
      <iframe className="w-full aspect-video" src={video.videoUrl}></iframe>
      <div className=" text-justify">
        {video.summary.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </Container>
  );
};

export default Page;
