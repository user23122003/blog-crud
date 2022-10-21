import React from "react";
const Field = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-1 flex flex-col gap-1 ${className}`} {...props}>
      {children}{" "}
    </div>
  );
};
export default Field;
