import React from "react";

const Label = ({ htmlFor = "", className = "", children, ...props }) => {
  return (
    <label
      className={` text-base font-normal block ${className} `}
      htmlFor={htmlFor}
      {...props}
    >
      {children}
    </label>
  );
};

export default Label;
