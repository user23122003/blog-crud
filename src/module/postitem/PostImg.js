import React from "react";

const PostImg = ({
  children,
  src = "",
  key = "",
  className = "",
  ...props
}) => {
  return (
    <>
      <img
        className={`h-full w-full object-cover rounded-lg ${className} `}
        src={src}
        alt=""
      />
      {children}
    </>
  );
};

export default PostImg;
