import React from "react";

import Banner from "../Layout/Banner";
import Feature from "../Layout/Feature";
import Newest from "../Layout/Newest";
import LastNew from "../Layout/LastNew";
import Layout from "../Layout/Layout";

const HomePage = () => {
  return (
    <>
      <Layout></Layout>
      <Banner></Banner>
      <Feature></Feature>
      <Newest></Newest>
      <LastNew></LastNew>
    </>
  );
};

export default HomePage;
