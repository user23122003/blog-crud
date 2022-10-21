import { signOut } from "firebase/auth";
import React from "react";

import { auth } from "../firebase-app/firebaseconfig";
import Banner from "../Layout/Banner";
import Feature from "../Layout/Feature";
import Newest from "../Layout/Newest";
import LastNew from "../Layout/LastNew";
import Layout from "../Layout/Layout";

const HomePage = () => {
  const handleLogOut = () => {
    signOut(auth);
  };
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
