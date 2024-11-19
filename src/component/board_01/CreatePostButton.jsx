import React from "react";
import styled from "styled-components";
import writebutton from "./asset/write_button.png";
import { useNavigate } from "react-router-dom";

function CreatePostButton({category}) {
  const navigate = useNavigate();

  function gotoWritePage() {
    navigate(`/boardpost/${category}`);
  };

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
