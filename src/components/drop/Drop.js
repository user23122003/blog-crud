/* eslint-disable jsx-a11y/alt-text */
import React from "react";

const Dropdown = ({
  checked,
  className = "",
  children,
  onClick = () => {},
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`transition-all h-0 rounded-xl ${className} bg-bg-primary w-[200px] text-center ${
        checked
          ? "opacity-100 text-base mt-1 p-2 translate-x-0 visible h-auto"
          : "opacity-0 invisible -translate-x-[200%]"
      }`}
    >
      {children}
    </div>
  );
};

export default Dropdown;
