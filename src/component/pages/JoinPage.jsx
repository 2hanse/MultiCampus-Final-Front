import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Header from "../join/Header";
import Button from "../join/Button";
import { ChevronDown } from "../join/Icons";
import api from "../api/axios";

const JoinPage = () => {

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

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault()
      try {
        await api
          .post("/join", {
            email: email,
            password: password,
            name: name,
            nickname: nickName,
            phone_number: phoneNum,
            recover_q: selectedQuestion,
            recover_a: answerQuestion
          })
          .then((res) => {
            console.log('response:', res);
            if (res.status === 200) {
              console.log("회원가입 성공");
            }
          })
      } catch (err) {
        console.log(err);
      }
    },
    [email, name, password]
  )

   // 이름
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

  // 이메일
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

  // 비밀번호
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

  const onChangePhoneNum = useCallback((e) => {
    setPhoneNum(e.target.value);
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

  
  return (
    <StyledForm onSubmit={onSubmit}>
      <Header />
      <main>
        <h2 className="form-title">회원정보 입력</h2>
        <p className="form-description">
          회원가입에 필요한 정보를 정확히 입력해주세요
          <br />
          본인확인을 위해 휴대폰인증 후 가입 가능합니다
        </p>
        <StyledInputField>
            <input type="email" placeholder="이메일" onChange={onChangeEmail}/>
            <Button small>중복확인</Button>
        </StyledInputField>
        <Formbox>
        {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </Formbox>

        <StyledInputField>
            <input  type="password" 
                    placeholder="비밀번호(숫자+영문자+특수문자로 8자리 이상)" 
                    onChange={onChangePassword}/>
        </StyledInputField>
        <Formbox>
        {password.length > 0 && (
            <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
          )}
        </Formbox>

        <StyledInputField>
            <input type="password" placeholder="비밀번호 재입력" onChange={onChangePasswordConfirm}/>
        </StyledInputField>
        <Formbox>
        {passwordConfirm.length > 0 && (
            <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
          )}
        </Formbox>

        <StyledInputField>
            <input type="text" placeholder="이름" onChange={onChangeName}/>
        </StyledInputField>
        <Formbox>
        {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
        </Formbox>

        <StyledInputField>
            <input type="text" placeholder="닉네임" onChange={onChangeNickName}/>
            <Button small>중복확인</Button>
        </StyledInputField>
        <Formbox>
        {nickName.length > 0 && <span className={`message ${isNickName ? 'success' : 'error'}`}>{nickNameMessage}</span>}
        </Formbox>

        <StyledInputField>
            <input type="text" placeholder="전화번호" onChange={onChangePhoneNum}/>
            <Button small>인증</Button>
        </StyledInputField>
        <Formbox>
        {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
        </Formbox>


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
            <input type="tel" placeholder="질문에 대한 답변" onChange={onChangeAnswerQuestion}/>
        </StyledInputField>
        <StyledButton type="submit">가입</StyledButton>
      </main>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  background-color: #fff2cc;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  border: 1px solid #000;
  display: flex;
  max-width: 480px;
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
    margin-top: 9px;
    font: 18px/27px Roboto, sans-serif;
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
  width: 294px;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  padding: 0 19px 0 70px;
  border: 1px solid #ffd966;
  margin-top: 7px;
`;

const SelectWrapper = styled.div`
  flex-grow: 1;
  cursor: pointer;
`;

const StyledSelect = styled.select`
  width: 100%;
  font-size: 18px;
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
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  margin-top: 14px;
  padding: 7px 8px;
  border: 1px solid #ffd966;
  align-items: center;

  input {
    flex: 1;
    border: none;
    outline: none;
    font-size: 15px;
    color: black;
  }

`;
const StyledButton = styled.button`
  margin-top:10px;
  border-radius: ${(props) => (props.small ? "0 10px 10px 0" : "10px")};
  background-color: #ffd966;
  color: #785a00;
  font-size: ${(props) => (props.small ? "13px" : "19px")};
  text-align: center;
  padding: ${(props) => (props.small ? "10px 20px" : "22px 70px")};
  border: none;
  cursor: pointer;
  white-space: nowrap;
`;
export default JoinPage;