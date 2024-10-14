import React, { useState } from "react";
import styled from "styled-components";
import Header from "./Header";
import InputField from "./InputField";
import Button from "./Button";
import { ChevronDown } from "./Icons";

const SignUpForm = () => {
  const inputFields = [
    { label: "이메일", hasButton: true, buttonText: "중복확인" },
    { label: "비밀번호", type: "password" },
    { label: "비밀번호 재입력", type: "password" },
    { label: "이름" },
    { label: "닉네임", hasButton: true, buttonText: "중복확인" },
    { label: "전화번호", hasButton: true, buttonText: "인증" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState("");

  const questions = [
    "아버지 고향은 어디입니까?",
    "당신의 보물 1호는 무엇입니까?",
    "출신 초등학교 이름은 무엇입니까?",
    "어머님의 성함은 무엇입니까?"
  ];

  const handleSelectChange = (event) => {
    setSelectedQuestion(event.target.value);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  return (
    <StyledForm>
      <Header />
      <main>
        <h2 className="form-title">회원정보 입력</h2>
        <p className="form-description">
          회원가입에 필요한 정보를 정확히 입력해주세요
          <br />
          본인확인을 위해 휴대폰인증 후 가입 가능합니다
        </p>
        {inputFields.map((field, index) => (
          <InputField key={index} {...field} />
        ))}
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


        <InputField label="질문에 대한 답변" />
        <Button >가입</Button>
      </main>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  background-color: #fff2cc;
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


export default SignUpForm;