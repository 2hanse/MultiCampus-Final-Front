import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ChevronDown } from "../join/Icons";
import api from "../api/axios";

function EmailForm() {

    const navigate = useNavigate();

    //이메일 찾기 정보 상태
    const [phoneNum, setPhoneNum] = useState('');
    const [selectedQuestion, setSelectedQuestion] = useState("");
    const [answerQuestion, setAnswerQuestion] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const onChangeAnswerQuestion = useCallback((e) => {
        setAnswerQuestion(e.target.value);
      },[]);

    const onChangePhoneNum = useCallback((e) => {
        setPhoneNum(e.target.value);
    },[]);
    
    //질문사항
    const questions = [
    "아버지 고향은 어디입니까?",
    "당신의 보물 1호는 무엇입니까?",
    "출신 초등학교 이름은 무엇입니까?",
    "어머님의 성함은 무엇입니까?"
    ];

    const handleSelectChange = (e) => {
    //console.log(e.target.value);
    setSelectedQuestion(e.target.value);
    setIsOpen(false);
    };

    const toggleDropdown = () => {
    setIsOpen(!isOpen);
    };

    const IdFindSubmit = async (phoneNum, selectedQuestion, answerQuestion) => {

        const idData = {
            phone_number: phoneNum,
            recover_q: selectedQuestion,
            recover_a: answerQuestion
        }

        if(phoneNum === "" || answerQuestion === "" || selectedQuestion === "") {
            alert("모두 입력해주세요");
        } else {
            try {
                await api.post("/users/find-email", idData);
                navigate("/user/findResultEmailPage");
            } catch(err) {
                console.log(err);
            }
        }
    }

  return (
    <FormWrapper>
      <FormField>
        <label htmlFor="phoneNumber" className="security-question-label">전화번호</label><br/>
        <PhoneInput id="phoneNumber" type="tel" placeholder="전화번호" onChange={onChangePhoneNum}/>
      </FormField>
      
      <label htmlFor="phoneNumber" className="security-question-label">이메일 찾기용 질문</label>
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
        <br/>
      <FormField>
        <label htmlFor="answer" className="security-question-label">질문에 대한 답변</label>
        <AnswerInput id="answer" type="text" placeholder="질문에 대한 답변" onChange={onChangeAnswerQuestion} />
      </FormField>
      <SubmitButton type="submit" onClick={(e) => {IdFindSubmit(phoneNum, selectedQuestion, answerQuestion)}}>이메일 확인</SubmitButton>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  display: flex;
  margin-top: 100px;
  width: 100%;
  flex-direction: column;
  color: #b7b2b2;
  padding: 0 42px;
  font: 400 15px Inter, sans-serif;

  .security-question-label {
    color: #ce9971;
    font-size: 15px;
    align-self: flex-start;
    margin-top: 15px;
  }
`;

const FormField = styled.div`
  margin-bottom: 25px;
`;

const PhoneInput = styled.input`
  border-radius: 10px;
  background-color: #fff;
  width: 80%;
  font-size: 16px;
  padding: 9px 8px;
  border: 1px solid #ffd966;
  margin-top: 5px;
  margin-bottom: -10px;
`;

const Card = styled.div`
  border-radius: 8px;
  background-color: #fff;
  display: flex;
  width: 370px;
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

const AnswerInput = styled.input`
  border-radius: 10px;
  background-color: #fff;
  font-size: 17px;
  width: 80%;
  padding: 7px 8px;
  border: 1px solid #ffd966;
  margin-top: 5px;
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

export default EmailForm;