import React from "react";
import styled from "styled-components";
const HeadingStyles = styled.h2`
  font-size: 24px;
  position: relative;
  margin-bottom: 26px;
  font-weight: 500;
  @media screen and (max-width: 1023.98px) {
    font-size: 20px;
    margin-bottom: 16px;
  }
`;
const Heading = ({ className = "", children }) => {
  return <HeadingStyles className={className}>{children}</HeadingStyles>;
};

export default Heading;
