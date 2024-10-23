import { NavLink } from "react-router-dom";
import styled from "styled-components";

const PasswordResult = () => {
    return (
        <div>
            <EmailDisplayWrapper>
                <b className="email-info">비밀번호가 변경되었습니다</b>
                <NavStyle to='/user/login'>로그인</NavStyle>
            </EmailDisplayWrapper>
    
        </div>
        
      );
}
const EmailDisplayWrapper = styled.section`
  display: flex;
  margin-top: 200px;
  width: 80%;
  flex-direction: column;
  color: #785a00;
  padding: 0 42px;
  font: 400 16px Inter, sans-serif;

  .email-info {
    color: #ce9971;
    font-size: 18px;
    margin-left: 18%;
    align-self: start;
  }
`;

const NavStyle = styled(NavLink)`
  border-radius: 10px;
  background-color: #ffd966;
  width: 96%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 40px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;

export default PasswordResult