import React from "react";
import { useController } from "react-hook-form";

const Radio = ({ checked, children, control, name, ...rest }) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <label>
      <input
        checked={checked}
        type="radio"
        className="hidden"
        {...field}
        {...rest}
      />
      <div className="flex items-center gap-x-3 font-medium cursor-pointer">
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center p-2  ${
            checked
              ? "bg-bg-green  text-text-color"
              : "bg-text-color  text-transparent"
          }`}
        ></div>
        <span>{children}</span>
      </div>
    </label>
  );
};

export default Radio;
