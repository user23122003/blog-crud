import React from "react";

const TextContent = ({ children, className = "", ...props }) => {
  return (
    <h3 className={className} {...props}>
      {children}
    </h3>
  );
};

export default TextContent;
