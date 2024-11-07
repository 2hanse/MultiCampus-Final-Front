import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import Timer from "../../layout/timer/Timer";

function PhoneIdentification() {

  const navigate = useNavigate();

  const location = useLocation();
  
  // 비밀번호 찾기 페이지 데이터 받기
  const userInfo = {...location.state};

  // 전화번호 상태저장
  const [phoneNum, setPhoneNum] = useState('');

  // 인증번호
  const [verificationCode, setVerificationCode] = useState(''); // 입력된 인증번호
  const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증번호 발송 여부
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(null); // 인증 성공 여부

  // 오류메시지 상태저장
  const [phoneNumMessage, setPhoneNumMessage] = useState('');

  // 유효성 검사
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


  // 인증번호 요청 함수
  const handleVerificationRequest = () => {
    // 서버에 인증번호 발송 요청을 보냄
    api.post('/sms/send', phoneNum, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .then(response => {
      if(response.status === 200) {
        console.log('인증번호 발송 성공:', response.data);
        setIsVerificationSent(true); // 인증번호 발송 성공 시 입력 필드를 표시하기 위해 상태를 true로 설정
        setPhoneNumMessage('');
      } else {
        console.log(response.data)
      }
    })
    .catch(error => {
        console.error('인증번호 발송 실패:', error);
    });
  };

  // 인증번호 입력 값 업데이트 함수
  const handleVerificationCodeChange = (event) => {
    setVerificationCode(event.target.value); // 입력된 인증번호를 상태에 저장
  };

  // 인증번호 검증 요청 함수
  const handleVerificationSubmit = () => {
    // 서버에 입력된 인증번호 검증 요청을 보냄
    api.post('/sms/verify', { phone_number : phoneNum, 
                              verifyCode: verificationCode })
        .then(response => {
            setIsVerificationSuccessful(response.data); // 서버의 응답에 따라 인증 성공 여부를 업데이트
            if (response.data) {
                alert('인증 성공!'); // 인증 성공 시 알림 표시
            } else {
                alert('인증 실패! 다시 시도해주세요.'); // 인증 실패 시 알림 표시
            }
        })
        .catch(error => {
            console.error('인증 실패:', error);
        });
  };

  const handleTimeUp = () => {
    setIsVerificationSent(false);
    alert("시간 초과! 인증번호를 다시 요청해주세요.");
  };


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
            <StyledButton   small
                            type="button"
                            onClick={handleVerificationRequest}>인증</StyledButton>
        </StyledInputField>
        <Formbox>
        {phoneNum.length > 0 && <span className={`message ${isPhoneNum ? 'success' : 'error'}`}>{phoneNumMessage}</span>}
        </Formbox>

        {/* 인증번호 입력 필드 및 확인 버튼, 인증번호 발송 후에만 표시됨 */}
        {isVerificationSent && (
          <div>
            <Label><Timer initialTime={180} onTimeUp={handleTimeUp} /></Label>
            
                <StyledInputField>
                    <input
                        id="verification-code"
                        placeholder="인증번호를 입력하세요"
                        value={verificationCode}
                        onChange={handleVerificationCodeChange} // 입력된 인증번호를 상태에 저장
                    />
                    <StyledButton
                        type="button"
                        onClick={handleVerificationSubmit}
                        small // 인증번호 확인 버튼 클릭 시 호출
                    >
                        확인
                    </StyledButton>
                </StyledInputField>
              </div>
            )}

        <SubmitButton type="button" onClick={onSubmit}>확인</SubmitButton>
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

const Label = styled.p`
  color: #ce9971;
  font-size: 15px;
  align-self: flex-start;
  margin-top: 1px;
  margin-bottom: 14px;
`;

export default PhoneIdentification;