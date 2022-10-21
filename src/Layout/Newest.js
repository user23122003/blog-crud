import React from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import NewestPost from "../module/postitem/NewestPost";

const Newest = () => {
  return (
    <Container>
      <Title className="text-primary">Bài viết mới nhất</Title>
      <NewestPost></NewestPost>
    </Container>
  );
};

export default Newest;
