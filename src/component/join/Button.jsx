import React from "react";
import styled from "styled-components";

const Button = ({ children, small }) => {
  return <StyledButton small={small}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  border-radius: ${(props) => (props.small ? "0 10px 10px 0" : "10px")};
  background-color: #ffd966;
  color: #785a00;
  font-size: ${(props) => (props.small ? "13px" : "19px")};
  text-align: center;
  padding: ${(props) => (props.small ? "10px 20px" : "22px 70px")};
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;

export default Button;