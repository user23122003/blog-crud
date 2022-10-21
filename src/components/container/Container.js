import React from "react";

const Container = ({ children, className = "", ...props }) => {
  return (
    <div
      className="w-full max-w-[1300px] mx-auto mt-10 p-4 rounded-2xl 
      bg-bg-secondary"
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
