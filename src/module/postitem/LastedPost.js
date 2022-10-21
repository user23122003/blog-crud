import React from "react";
import PostImg from "./PostImg";
import TextContent from "../../text/TextContent";
import TextTitle from "../../text/TextTitle";
const LastedDataPost = [
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
    url: "https://lh3.googleusercontent.com/wJnjWz3kB_kUYn8ii8xyV_Gzo03XdzLPFg9zCQFDS0NM05ghIwR_IDOI4tkqoDaEGHQDyWLFtioAwHDHTM4Oah_O",
    title: "Trải nghiệm",
    content: "Kinh nghiệm sống là kinh nghiệm sống bạn nha",
  },
  {
    url: "https://lh3.googleusercontent.com/kK8bxxhI0Co8HJp4j5g4dIjArVm5NBv1g3SUD4gbkhbwKpjkD9zIgnVgfTC6FPXX8xE0JqD7lVSE07xax35YDxJ4",
    title: "Tri thức",
    content: "Kinh nghiệm sống là kinh nghiệm sống bạn nha",
  },
];
const LastedPost = () => {
  return (
    <div
      className="flex justify-center items-center md:flex-row sm:flex-col
     gap-8 w-full"
    >
      {LastedDataPost.map((item) => (
        <div key={item.title} className="w-full cursor-pointer p-2 rounded-lg ">
          <PostImg src={item.url} className="mb-4 max-h-[200px]"></PostImg>
          <TextTitle className="py-2 px-4 inline-block font-bold rounded-md bg-bg-dark">
            {item.title}
          </TextTitle>
          <TextContent className="p-2 max-w-[200px] rounded-md text-sm">
            {item.content}
          </TextContent>
        </div>
      ))}
    </div>
  );
};

export default LastedPost;
