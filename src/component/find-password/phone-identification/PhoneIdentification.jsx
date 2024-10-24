import React, { useCallback, useState } from "react";
import styled from "styled-components";
import api from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";

function PhoneIdentification() {

  const navigate = useNavigate();

  const location = useLocation();
  
  //비밀번호 찾기 페이지 데이터 받기
  const userInfo = {...location.state};

  //전화번호 상태저장
  const [phoneNum, setPhoneNum] = useState('');

  //오류메시지 상태저장
  const [phoneNumMessage, setPhoneNumMessage] = useState('');

  // 유효성 검사 상태저장
  const [isPhoneNum, setIsPhoneNum] = useState(false);

  // 전화번호 유효성 검사
  const onChangePhoneNum = useCallback((e) => {
    const phoneNumRegex = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/
    const phoneNumCurrent = e.target.value
    setPhoneNum(phoneNumCurrent)

    if (!phoneNumRegex.test(phoneNumCurrent)) {
      setPhoneNumMessage('숫자만 입력 및 7자리이상 입력 해주세요')
      setIsPhoneNum(false)
    } else {
      setPhoneNumMessage('올바른 형식이에요 : )')
      setIsPhoneNum(true)
    }
  },[])

  //휴대폰 및 이메일 서버로 전송
  const onSubmit = async() => {
    const data = {
      email: userInfo.email,
      phone_number: phoneNum
    };
    try{
      const response = await api.post("/email-exists",data);
      if(response.status == 200) {
        navigate("/user/resetPassword",{state: {    email: userInfo.email,
                                                    phone_number: response.data.phone_number
        } });
      } else {
        setPhoneNumMessage(response.data.errMsg);
        setIsPhoneNum(false);
      }
    } catch(err) {
      console.log(err);
    }
  }

  return (
    <FormWrapper>
      <form>
      <FormInstructions>휴대폰 인증</FormInstructions>
      <StyledInputField>
            <input  type="text" 
                    placeholder="전화번호( -를 제외하고 입력)" 
                    className="input"
                    onChange={onChangePhoneNum}/>
            <StyledButton small>인증</StyledButton>
        </StyledInputField>
        <Formbox>
        {phoneNum.length > 0 && <span className={`message ${isPhoneNum ? 'success' : 'error'}`}>{phoneNumMessage}</span>}
        </Formbox>
        <SubmitButton type="submit" onClick={onSubmit}>확인</SubmitButton>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.section`
  display: flex;
  margin-top: 160px;
  width: 94%;
  flex-direction: column;
  font-family: Inter, sans-serif;
  font-weight: 400;
  padding: 0 42px;
`;

const Formbox = styled.div`
      position: relative;
      margin-top: 12px;

    .message {
      line-height: 24px;
      letter-spacing: -1px;
      position: absolute;
      bottom: -10px;
      left: 0;
      &.success {
        color: #8f8c8b;
      }
      &.error {
        color: #ff2727;
      }
    }
  }
`;

const FormInstructions = styled.p`
  color: #ce9971;
  font-size: 15px;
  align-self: start;
`;

const StyledInputField = styled.div`
  display: flex;
  align-items: center;
  margin-top: -10px;
  width: 84%;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: black;
    background-color: #fff;
    border-radius: 10px 0 0 10px;
    border: 1px solid #ffd966;
    padding: 10px 7px;
  }
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  background-color: #ffd966;
  width: 84%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 26px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
`;

const StyledButton = styled.button`
  border-radius: ${(props) => (props.small ? "0 10px 10px 0" : "10px")};
  background-color: #ffd966;
  color: #785a00;
  font-size: ${(props) => (props.small ? "13px" : "19px")};
  text-align: center;
  padding: ${(props) => (props.small ? "11px 20px" : "22px 70px")};
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;



export default PhoneIdentification;