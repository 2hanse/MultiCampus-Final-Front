import React from "react";
import styled from "styled-components";

const Header = () => {
  return (
    <div>
      <StyledHeader>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" alt="Sign up icon" className="header-icon" />
        <h1 className="header-title">회원가입</h1>
      </StyledHeader>
      <hr />
    </div>
    
  );
};

const StyledHeader = styled.header`
  display: flex;
  margin-left: 28px;
  width: 220px;
  max-width: 100%;
  align-items: flex-start;
  gap: 20px;
  color: #000;
  white-space: nowrap;
  text-align: center;
  justify-content: space-between;
  font: 400 10px/1 Roboto, sans-serif;

  .header-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    width: 24px;
  }

  .header-title {
    border-color: #000;
    margin-top: 15px;
    margin-left: 120px;
  }

`;

export default Header;