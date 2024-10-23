import React from "react";
import styled from "styled-components";

const UserAvatar = ({ src }) => {
  return <AvatarImage loading="lazy" src={src} alt="User avatar" />;
};

const AvatarImage = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 60px;
`;

export default UserAvatar;