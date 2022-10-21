import React from "react";
import Container from "../components/container/Container";
import Title from "../components/title/Title";
import FeaturePost from "../module/postitem/FeaturePost";

const Feature = () => {
  return (
    <Container>
      <Title className="text-primary">Bài viết nổi bật</Title>
      <FeaturePost></FeaturePost>
    </Container>
  );
};

export default Feature;
