import React from "react";
import { useController } from "react-hook-form";

const Input = ({ className = "", control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: "",
  });
  return (
    <input
      className={`p-3 border-2 focus:outline-none text-sm  cursor-pointer rounded-lg w-full text-text-gray ${className} `}
      {...field}
      {...props}
    />
  );
};

export default Input;
