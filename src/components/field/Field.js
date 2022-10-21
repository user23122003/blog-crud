import React, { Children } from "react";
import Input from "../input/Input";
import Label from "../label/Label";

const Field = ({ children, className = "", ...props }) => {
  return (
    <div className={`p-1 flex flex-col gap-1 ${className}`}>{children}</div>
  );
};

export default Field;
