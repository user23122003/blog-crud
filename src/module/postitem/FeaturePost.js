import React from "react";
import PostImg from "./PostImg";
import TextContent from "../../text/TextContent";
import TextTitle from "../../text/TextTitle";
import { useState } from "react";
import { useEffect } from "react";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseconfig";
import { useNavigate } from "react-router-dom";

const FeaturePost = () => {
  const result = [];
  const navigate = useNavigate();
  const resultTitle = [];
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function FecthData() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("status", "==", 1), limit(3));
      onSnapshot(q, (item) => {
        item.forEach((doc) => {
          result.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setPost(result);
      });
    }
    FecthData();
  }, [result]);
  useEffect(() => {
    const colRef = collection(db, "category");
    const q = query(colRef, where("status", ">", 1), limit(3));
    onSnapshot(q, (item) => {
      item.forEach((doc) => {
        resultTitle.push({
          ...doc.data(),
        });
      });
      setCategory(resultTitle);
    });
  }, []);
  if (post.length <= 0) return null;
  if (category.length <= 0) return null;
  return (
    <div
      className="flex justify-center items-center sm:p-2 sm:flex-col
     md:flex-row gap-8 w-full"
    >
      {post?.map((item) => (
        <div
          onClick={() => navigate(`/post/${item.slug}`)}
          key={item.name}
          className="md:w-[450px] sm:max-w-[380px] cursor-pointer 
          md:h-[300px] sm:h-[250px] p-2 rounded-lg relative"
        >
          <PostImg src={item.image} className="opacity-80"></PostImg>
          <TextTitle
            key={item.id}
            className="max-w-max p-2 border-2 border-text-blue 
            rounded-md bg-text-color text-text-blue font-semibold 
            absolute left-8 top-6 "
          >
            {item?.category.name}
          </TextTitle>
          <TextContent
            className="p-2 max-w-[200px] rounded-md text-sm 
          absolute 
          left-8 top-16 font-bold"
          >
            {item.title}
          </TextContent>
        </div>
      ))}
    </div>
  );
};

export default FeaturePost;
