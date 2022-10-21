import React, { useEffect, useState } from "react";
import PostImg from "./PostImg";
import TextContent from "../../text/TextContent";
import TextTitle from "../../text/TextTitle";
import { useNavigate } from "react-router-dom";
import {
  collection,
  limit,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase-app/firebaseconfig";
const NewestDataPost = [
  {
    url: "https://lh3.googleusercontent.com/j1b9LK8NmC8t9rd6Hg2hNunrLUAIVgmEaLiJKHjwW2Jwl6fwj3R1Zz8Olv-zeLYvevs21mGZiMcIg2eWaExYRRF4sQ",
    title: "Kiến thức",
    content: "Kinh nghiệm sống là kinh nghiệm sống bạn nha",
  },
  {
    url: "https://lh3.googleusercontent.com/7elY72xbrb7BPSmpuW6fjywum9OPIURxqbTxeD6w6dFGjR1XwhK43-htNay5YRfOw73JnRwpPEYC9_WOrd2WOAO5gtk",
    title: "Kinh nghiệm",
    content: "Kinh nghiệm sống là kinh nghiệm sống bạn nha",
  },
  {
    url: "https://lh3.googleusercontent.com/kK8bxxhI0Co8HJp4j5g4dIjArVm5NBv1g3SUD4gbkhbwKpjkD9zIgnVgfTC6FPXX8xE0JqD7lVSE07xax35YDxJ4",
    title: "Trải nghiệm",
    content: "Kinh nghiệm sống là kinh nghiệm sống bạn nha",
  },
];
const NewestPost = () => {
  const navigate = useNavigate();
  const result = [];
  const resultTitle = [];
  const [post, setPost] = useState([]);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    async function FecthData() {
      const colRef = collection(db, "posts");
      const q = query(colRef, where("status", "==", 2), limit(3));
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
    return () => {
      FecthData();
    };
  }, []);
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
    <div className="flex p-2 gap-4 md:flex-row sm:flex-col">
      <div className="w-full h-full rounded-lg flex-1 ">
        <img
          className="h-full w-full object-cover rounded-lg"
          src="https://lh3.googleusercontent.com/oSuGpxGetz3f-FqKRgUaZlpvDg8Eu0SOaAQFKUKVMXhzMxQOANv5ccOTvQ3p93pGkncS_lrKYZNHYsbAJrFXQTQY9A"
          alt=""
        />
        <h1 className=" px-6 py-2 inline-block rounded-md bg-bg-dark text-lg mt-4 font-semibold  ">
          Kiến thức
        </h1>
        <h3 className="p-2 w-full rounded-md text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          tenetur totam.
        </h3>
      </div>
      <div className="flex flex-col gap-2 md:w-1/2 sm:w-full cursor-pointer  ">
        {post.map((item) => (
          <div
            onClick={() => navigate(`/post/${item.slug}`)}
            className="flex items-center justify-center bg-bg-primary rounded-lg 
            py-4 px-6 w-full gap-1 "
          >
            <div
              key={item.title}
              className="md:min-w-[250px] sm:min-w-[130px] cursor-pointer
               h-[160px] rounded-lg"
            >
              <PostImg src={item.image}></PostImg>
            </div>
            <div className="flex flex-col h-full">
              <TextTitle className="inline-block px-4 rounded-md bg-bg-secondary text-lg  font-semibold  ">
                {item?.category.name}
              </TextTitle>
              <TextContent className="p-2 w-full rounded-md text-sm text-primary ">
                {item.title}
              </TextContent>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewestPost;
