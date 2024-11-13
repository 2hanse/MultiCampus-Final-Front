import React from "react";
import styled from "styled-components";
import writebutton from "./asset/write_button.png"; // 이미지를 import
import { useNavigate } from "react-router-dom";

function CreatePostButton() {
  const navigate = useNavigate();

  function gotoWritePage() {
    navigate('/boardpost/restaurant');
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
  right: 40%; // 화면 좌우 정 중앙에 위치
  transform: translateX(-50%); // 중앙 보정
  top: 772px;
  cursor: pointer;
`;

export default CreatePostButton;
