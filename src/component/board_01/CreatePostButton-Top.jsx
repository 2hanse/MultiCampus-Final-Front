import React from "react";
import styled from "styled-components";
import writebutton from "./asset/write_button.png"; // 이미지를 import
import { useNavigate } from "react-router-dom";

function CreatePostButton() {
  const navigate = useNavigate();

  function gotoWritePage() {
    navigate('/boardpost/top');
  }

  return (
    <WriteButton
      src={writebutton}
      alt="writebutton"
      onClick={gotoWritePage}
    />
  );
}

const WriteButton = styled.img`
  position: fixed;
  width: 40px;
  height: 40px;
  left: 50%;
  transform: translateX(-50%);
  bottom: 133px;
  cursor: pointer;
`;

export default CreatePostButton;
