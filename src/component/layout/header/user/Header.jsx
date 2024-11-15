import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = ({navigatePath, title}) => {
  const navigate = useNavigate();
  const onClickIcon = () => {
    navigate(navigatePath);
  }
  return (
    <div>
        <Wrapper>
          <img  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a5c6e224a78addfb6dfdd81623a41bf80539dc36492c8744900ebc91120e359?placeholderIfAbsent=true&apiKey=7adddd5587f24b91884c2915be4df62c" 
              alt="Sign up icon" 
              className="header-icon"
              onClick={onClickIcon} />
        </Wrapper>
      <StyledHeader>
        

        <h1 className="header-title">{title}</h1>
      </StyledHeader>
      <hr />
    </div>
    
  );
};

const StyledHeader = styled.header`
  display: flex;
  align-items: center; /* 수직 정렬 */
  justify-content: center; /* 가로 정렬 */
  width: 100%;
  color: #000;
  white-space: nowrap;
  text-align: center;
  font: 400 10px/1 Roboto, sans-serif;

  .header-title {
    border-color: #000;
    text-align: center;
    margin: 0 auto; /* 가운데 정렬 */
    margin-top: -3%;
    margin-bottom: 4%;
  }

`;

const Wrapper = styled.div`
  .header-icon {
    aspect-ratio: 1;
    object-fit: contain;
    object-position: center;
    margin-left: 7%;
  }
  cursor: pointer;
`;

export default Header;