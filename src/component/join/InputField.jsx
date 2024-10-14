import React from "react";
import styled from "styled-components";
import Button from "./Button";

const InputField = ({ label, hasButton, buttonText, type = "text" }) => {
  return (
    <StyledInputField>
      <label htmlFor={label} className="visually-hidden">
        {label}
      </label>
      <input type={type} id={label} placeholder={label} aria-label={label} />
      {hasButton && <Button small>{buttonText}</Button>}
    </StyledInputField>
  );
};

const StyledInputField = styled.div`
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  margin-top: 14px;
  padding: 7px 8px;
  border: 1px solid #ffd966;
  align-items: center;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 15px;
    color: black;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

export default InputField;