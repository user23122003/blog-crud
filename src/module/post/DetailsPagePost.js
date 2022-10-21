import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase-app/firebaseconfig";
import Header from "../../Layout/Header";
import PageNotFound from "../../pages/PageNotFound";
import TextTitle from "../../text/TextTitle";
import PostImg from "../postitem/PostImg";
import parse from "html-react-parser";

const DetailsPagePost = () => {
  const { slug } = useParams();
  const [postInfo, setPostInfo] = useState([]);
  useEffect(() => {
    async function fetchData() {
      if (!slug) return;
      const colRef = query(collection(db, "posts"), where("slug", "==", slug));
      onSnapshot(colRef, (snapshot) => {
        snapshot.forEach((doc) => {
          doc.data() &&
            setPostInfo({
              id: doc.id,
              ...doc.data(),
            });
        });
      });
    }
    fetchData();
  }, [slug]);
  if (!slug) return <PageNotFound></PageNotFound>;
  return (
    <>
      <Header></Header>
      <div className="md:p-6 sm:p-1 flex justify-center">
        <div
          className="md:p-4 md:w-3/4 sm:p-1 sm:w-full mt-6 bg-bg-secondary 
        rounded-lg flex flex-col cursor-pointer"
        >
          <TextTitle className="font-bold text-2xl my-2 text-center text-error">
            {postInfo.title}
          </TextTitle>
          <div
            className="md:p-4 md:mt-5 md:w-1/2 sm:w-full sm:p-2 sm:mt-2
            bg-text-gray h-[150px] rounded-lg flex justify-cemter gap-5  items-center"
          >
            <div className="h-[100px] w-[100px] rounded-full ">
              <PostImg className="rounded-full" src={postInfo.image}></PostImg>
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="font-normal text-base flex-1 h-full">
                Tác giả: {postInfo.author}
              </h1>
              <p className="font-light text-base mt-auto ">
                Danh mục: {postInfo.category?.name}
              </p>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-normal text-sm leading-8 my-8">
              {parse(`${postInfo.content}`)}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPagePost;
