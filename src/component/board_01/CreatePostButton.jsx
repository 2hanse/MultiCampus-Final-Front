import React from "react";
import styled from "styled-components";
import writebutton from "./asset/write_button.png";
import { useNavigate } from "react-router-dom";

function CreatePostButton() {
  return (
    <WriteButton src={writebutton} alt='writebutton'/>
  );
}

const WriteButton = styled.img`
  position: fixed;
  width: 40px;
  height: 40px;
  right: 48.5%;
  bottom: 20%;

  cursor: pointer;
`

// function CreatePostButton() {
//   return (
//     <FloatingButton aria-label="Create new post">
//       <PlusIcon aria-hidden="true" />
//     </FloatingButton>
//   );
// }

// const FloatingButton = styled.button`
//   border-radius: 12px;
//   background-color: #ffd966;
//   box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.3);
//   display: flex;
//   width: 40px;
//   height: 40px;
//   align-items: center;
//   justify-content: center;
//   border: none;
//   cursor: pointer;
//   position: fixed;
//   bottom: 20px;
//   right: 20px;
// `;

// const PlusIcon = styled.span`
//   background-size: contain;
//   width: 40px;
//   height: 40px;
// `;

export default CreatePostButton;