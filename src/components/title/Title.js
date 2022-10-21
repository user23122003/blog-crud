import React from "react";

const Title = ({ children, className = "" }) => {
  return (
    <h3 className={`p-2 text-xl font-bold text-text-color mb-2 ${className} `}>
      {children}
    </h3>
  );
};

export default Title;
