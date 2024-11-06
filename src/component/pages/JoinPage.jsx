import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../layout/header/user/Header";
import { ChevronDown } from "../join/Icons";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import Timer from "../layout/timer/Timer";

const JoinPage = () => {

  const navigate = useNavigate();

  //질문 상태저장
  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [answerQuestion, setAnswerQuestion] = useState("");

  //회원가입 확인
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [verificationCode, setVerificationCode] = useState(''); // 입력된 인증번호
  const [isVerificationSent, setIsVerificationSent] = useState(false); // 인증번호 발송 여부
  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(null); // 인증 성공 여부

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [nameMessage, setNameMessage] = useState('');
  const [nickNameMessage, setNickNameMessage] = useState('');
  const [phoneNumMessage, setPhoneNumMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const [isName, setIsName] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPhoneNum, setIsPhoneNum] = useState(false);

   // 이름 유효성 검사
   const onChangeName = useCallback((e) => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 32글자 미만으로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('올바른 이름 형식입니다 :)')
      setIsName(true)
    }
  }, [])

  // 이메일 중복 확인 함수 추가
  const checkEmail = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/email-exists', { email: email });
      if (response.data) {
        setEmailMessage('이미 사용 중인 이메일입니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('사용 가능한 이메일입니다.');
        setIsEmail(true);
        console.log("확인완료")
      }
    } catch (error) {
      console.log('중복 확인 중 오류 발생:', error);
      setEmailMessage('중복 확인 중 오류가 발생했습니다.');
      setIsEmail(false);
    }
  }, [email]);

  // 닉네임 중복 확인 함수 추가
  const checkNickName = useCallback(async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/nickname-exists', { nickName: nickName });
      if (response.data) {
        setNickNameMessage('이미 사용 중인 닉네임입니다.');
        setIsNickName(false);
      } else {
        setNickNameMessage('사용 가능한 닉네임입니다.');
        setIsNickName(true);
      }
    } catch (error) {
      console.log('중복 확인 중 오류 발생:', error);
      setNickNameMessage('중복 확인 중 오류가 발생했습니다.');
      setIsNickName(false);
    }
  }, [nickName]);

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

  // 비밀번호 유효성 검사
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자로 8자리이상 입력해주세요')
      setIsPassword(false)
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback((e) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 : )')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )

  // 닉네임 유효성 검사
  const onChangeNickName = useCallback((e) => {
    setNickName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNickNameMessage('2글자 이상 입력해주세요.')
      setIsNickName(false)
    } else {
      setNickNameMessage('올바른 닉네임 형식입니다 :)')
      setIsNickName(true)
    }
  }, [])

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

  const onChangeAnswerQuestion = useCallback((e) => {
    setAnswerQuestion(e.target.value);
  },[])

  //질문사항
  const questions = [
    "아버지 고향은 어디입니까?",
    "당신의 보물 1호는 무엇입니까?",
    "출신 초등학교 이름은 무엇입니까?",
    "어머님의 성함은 무엇입니까?"
  ];

  const handleSelectChange = (event) => {
    console.log(event.target.value);
    setSelectedQuestion(event.target.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // 인증번호 요청 함수
  const handleVerificationRequest = () => {
    // 서버에 인증번호 발송 요청을 보냄
    api.post('/sms/send', phoneNum, {
      headers: {
        'Content-Type': 'text/plain'
      }
    })
    .then(response => {
        console.log('인증번호 발송 성공:', response.data);
        console.log(response.status)
        setIsVerificationSent(true); // 인증번호 발송 성공 시 입력 필드를 표시하기 위해 상태를 true로 설정
        setPhoneNumMessage('');
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


  // 회원가입 기능
  const onSubmit = useCallback( async (e) => {
    e.preventDefault()
      try {
        //test
        //console.log(email, password, name, nickName);
        //console.log(phoneNum, selectedQuestion, answerQuestion);
        await api
          .post("/users/join", {
            email: email,
            password: password,
            name: name,
            nickname: nickName,
            recover_q: selectedQuestion,
            recover_a: answerQuestion,
            phone_number: phoneNum
          })
          .then((res) => {
            console.log('response:', res);
            if (res.status === 200) {
              console.log("회원가입 성공");
              alert("회원가입 성공!");
              alert("마이 페이지에 가시면 이미지변경이 가능합니다!")
              navigate("/");
            }
          })
      } catch (err) {
        console.log(err);
      }
  },
  [email, password, name, nickName, phoneNum, selectedQuestion, answerQuestion, navigate]
)

  
  return (
    <StyledForm onSubmit={onSubmit}>
      <Header navigatePath="/user/login" title="회원가입"/>
      <main>
        <h2 className="form-title">회원정보 입력</h2>
        <p className="form-description">
          회원가입에 필요한 정보를 정확히 입력해주세요
          <br />
          본인확인을 위해 휴대폰인증 후 가입 가능합니다
        </p>
        <StyledInputField>
            <input type="email" placeholder="이메일" onChange={onChangeEmail}/>
            <StyledButton small onClick={checkEmail}>중복확인</StyledButton>
        </StyledInputField>
        <Formbox>
        {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </Formbox>

        <StyledInputField>
            <input  type="password" 
                    placeholder="비밀번호(숫자+영문자+특수문자로 8자리 이상)" 
                    onChange={onChangePassword}
                    className="input2"/>
        </StyledInputField>
        <Formbox>
        {password.length > 0 && (
            <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
          )}
        </Formbox>

        <StyledInputField>
            <input  type="password" 
                    placeholder="비밀번호 재입력" 
                    onChange={onChangePasswordConfirm}
                    className="input2"/>
        </StyledInputField>
        <Formbox>
        {passwordConfirm.length > 0 && (
            <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
          )}
        </Formbox>

        <StyledInputField>
            <input  type="text" 
                    placeholder="이름"
                    onChange={onChangeName}
                    className="input2"/>
        </StyledInputField>
        <Formbox>
        {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
        </Formbox>

        <StyledInputField>
            <input type="text" placeholder="닉네임" onChange={onChangeNickName}/>
            <StyledButton small onClick={checkNickName} type="button">중복확인</StyledButton>
        </StyledInputField>
        <Formbox>
        {nickName.length > 0 && <span className={`message ${isNickName ? 'success' : 'error'}`}>{nickNameMessage}</span>}
        </Formbox>

        <StyledInputField>
            <input type="text" placeholder="전화번호( -를 제외하고 입력)" onChange={onChangePhoneNum}/>
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


        <label htmlFor="securityQuestion" className="security-question-label">
          이메일 찾기용 질문
        </label>
        <Card>
          <SelectWrapper onClick={toggleDropdown}>
            <StyledSelect
              value={selectedQuestion}
              onChange={handleSelectChange}
              onBlur={() => setIsOpen(false)}
              open={isOpen}
            >
              <option value="" disabled hidden>
                질문을 선택해 주세요
              </option>
              {questions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </StyledSelect>
          </SelectWrapper>
          <IconWrapper onClick={toggleDropdown} isOpen={isOpen}>
            <ChevronDown />
          </IconWrapper>
        </Card>


        <StyledInputField>
            <input  type="text" 
                    placeholder="질문에 대한 답변" 
                    onChange={onChangeAnswerQuestion}
                    className="input2"/>
        </StyledInputField>
        <SubmitButton type="submit">가입</SubmitButton>
      </main>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  background-color: #fff2cc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  display: flex;
  max-width: 430px;
  max-height: 932px;
  width: 100%;
  padding-top: 62px;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto;

  main {
    display: flex;
    margin-top: 4px;
    width: 80%;
    flex-direction: column;
    font-family: Inter, sans-serif;
    font-weight: 400;
    padding: 0 37px;
  }

  .form-title {
    color: #e1650f;
    align-self: flex-start;
    font: 24px/1 Roboto, sans-serif;
  }

  .form-description {
    color: #ce9971;
    margin-top: 0px;
    font: 16px/27px Roboto, sans-serif;
  }

  .security-question-label {
    color: #ce9971;
    font-size: 15px;
    align-self: flex-start;
    margin-top: 15px;
  }

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

const Card = styled.div`
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  width: 92%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 0px 19px 0px 10px;
  border: 1px solid #ffd966;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const SelectWrapper = styled.div`
  flex-grow: 1;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  width: 100%;
  font-size: 16px;
  color: #1e1e1e;
  border: none;
  background-color: transparent;
  appearance: none;
  outline: none;
  cursor: pointer;
  &::-ms-expand {
    display: none;
  }
`;

const IconWrapper = styled.div`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0)")};
  transition: transform 0.3s ease;
  cursor: pointer;
`;

const StyledInputField = styled.div`
  display: flex;
  margin-top: 14px;
  align-items: center;

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
  
  .input2 {
    flex: 1;
    border: none;
    outline: none;
    font-size: 16px;
    color: black;
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #ffd966;
    padding: 10px 8px;
  }

`;
const SubmitButton = styled.button`
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
  margin-bottom: 10px;
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
  margin-bottom: -10px;
`;
export default JoinPage;