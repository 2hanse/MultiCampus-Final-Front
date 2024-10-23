import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

function EmailDisplay() {
  const location = useLocation();
  const emailResult = {...location.state};

  // const [email,setEmail] = useState("");
  // setEmail(emailResult);

  return (
    <div>
        <EmailDisplayWrapper>
            <p className="email-info">회원님이 가입한 이메일은 다음과 같습니다</p>
            <div className="email-container">{emailResult.email}</div>
            <NavStyle to='/user/login'>로그인</NavStyle>
            <NavStyle to='/user/find-password'>비밀번호 찾기</NavStyle>
        </EmailDisplayWrapper>

    </div>
    
  );
}

const EmailDisplayWrapper = styled.section`
  display: flex;
  margin-top: 160px;
  width: 80%;
  flex-direction: column;
  color: #785a00;
  padding: 0 42px;
  font: 400 15px Inter, sans-serif;

  .email-info {
    color: #ce9971;
    align-self: start;
  }

  .email-container {
    border-radius: 10px;
    background-color: #fff;
    margin-top: 8px;
    color: #000;
    white-space: nowrap;
    text-align: center;
    padding: 24px 70px;
    border: 1px solid #ffd966;
  }
`;

const NavStyle = styled(NavLink)`
  border-radius: 10px;
  background-color: #ffd966;
  width: 100%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 26px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
`;
export default EmailDisplay;