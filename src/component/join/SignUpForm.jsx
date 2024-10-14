import React from "react";
import styled from "styled-components";
import Header from "./Header";
import InputField from "./InputField";
import Button from "./Button";
import Dropdown from "./Dropdown";
import axios from "axios";

const SignUpForm = () => {
  const inputFields = [
    { label: "이메일", hasButton: true, buttonText: "중복확인" },
    { label: "비밀번호", type: "password" },
    { label: "비밀번호 재입력", type: "password" },
    { label: "이름" },
    { label: "닉네임", hasButton: true, buttonText: "중복확인" },
    { label: "전화번호", hasButton: true, buttonText: "인증" },
  ];

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
        <Dropdown id="securityQuestion" />
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

export default SignUpForm;