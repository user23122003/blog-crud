import React from "react";
import Loading from "../loading/Loading";

const Button = ({
  className = "",
  children,
  type = "submit",
  onClick = () => {},
  ...props
}) => {
  const { isLoading } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  return (
    <button onClick={onClick} className={className}>
      {child}
    </button>
  );
};

export default Button;
