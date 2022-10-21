import React from "react";

const TextTitle = ({ children, className = "", ...props }) => {
  return (
    <h1 className={className} {...props}>
      {children}
    </h1>
  );
};

export default TextTitle;
