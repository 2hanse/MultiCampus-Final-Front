import React, { useCallback, useState } from "react";
import styled from "styled-components";

function PasswordRecoveryForm() {

  //로그인 상태저장
  const [email, setEmail] = useState('');

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);

  // 이메일 유효성 검사
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ')
      setIsEmail(false)
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )')
      setIsEmail(true)
    }
  }, [])

  return (
    <FormWrapper>
      <FormInstructions>비밀번호를 찾을 이메일을 입력하세요</FormInstructions>
      <form>
        <StyledInputField>
            <input  type="email" 
                    placeholder="이메일을 입력해주세요"
                    className="input2"
                    onChange={onChangeEmail}/>
        </StyledInputField>
        <Formbox>
        {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </Formbox>
        <SubmitButton type="submit">본인 인증하기</SubmitButton>
      </form>
    </FormWrapper>
  );
}

const FormWrapper = styled.section`
  display: flex;
  margin-top: 160px;
  width: 100%;
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
  margin-bottom: 3px;
`;

const StyledInputField = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 15px;
    color: black;
    background-color: #fff;
    border-radius: 10px;
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



export default PasswordRecoveryForm;