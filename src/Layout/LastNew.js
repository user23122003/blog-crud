import React from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import LastedPost from "../module/postitem/LastedPost";

const LastNew = () => {
  return (
    <Container>
      <Title className="text-textBlue">Bài viết gần đây</Title>
      <LastedPost></LastedPost>
    </Container>
  );
};

export default LastNew;
