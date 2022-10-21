import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LabelStatusStyles = styled.span`
  background-color: var(--text-gray);
  display: inline-block;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
`;
/**
 *
 * @param type - "default" "success" "warning" "danger"
 * @returns
 */
const LabelStatus = ({ children, type = "default" }) => {
  let styleClassName = "text-text-gray ";
  switch (type) {
    case "success":
      styleClassName = "text-bg-green ";
      break;
    case "warning":
      styleClassName = "text-bg-organ ";
      break;
    case "danger":
      styleClassName = "text-bg-red ";
      break;

    default:
      break;
  }
  return (
    <LabelStatusStyles className={styleClassName}>{children}</LabelStatusStyles>
  );
};
LabelStatus.propTypes = {
  children: PropTypes.node,
  type: PropTypes.oneOf(["default", "success", "warning", "danger"]).isRequired,
};
export default LabelStatus;
