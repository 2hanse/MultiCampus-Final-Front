import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <BackButton
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=96b0aafc0bca4efc865afcf9a032943c"
        alt="Back"
        onClick={() => {
          navigate(-1);
        }}
      />
      <HeaderTitle>게시글 작성</HeaderTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  background-color: #f4b183;
  display: flex;
  width: 430;
  align-items: center;
  justify-content: space-between;
  padding: 62px 20px 25px;
`;

const BackButton = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

const HeaderTitle = styled.h1`
  font-size: 18px;
  color: #000;
  text-align: center;
  margin-left: 30px;
`;

export default Header;
