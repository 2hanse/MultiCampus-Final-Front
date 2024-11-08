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

  //오류메시지 상태저장
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

    const onChangeAnswerQuestion = useCallback((e) => {
        setAnswerQuestion(e.target.value);
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
            setPhoneNum("");
            setAnswerQuestion("");
            setSelectedQuestion("");
        } else {
            try {
                const response = await api.post("/users/find-email", idData);
                if(response.status === 204) {
                  alert("해당 전화번호는 찾을 수 없습니다")
                  setPhoneNum('');
                  setAnswerQuestion('');
                  questions = '';
                } else if (response.status === 200 ) {
                  console.log(response.data);
                  navigate("/user/findResultEmailPage",{ state: { email: response.data }});
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

  return (
    <FormWrapper>
      <FormField>
        <label htmlFor="phoneNumber" className="security-question-label">전화번호</label><br/>
        <PhoneInput type="tel" placeholder="전화번호( -를 제외하고 입력)" onChange={onChangePhoneNum}/>
        <Formbox>
        {phoneNum.length > 0 && <span className={`message ${isPhoneNum ? 'success' : 'error'}`}>{phoneNumMessage}</span>}
        </Formbox>
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
      <SubmitButton type="button" onClick={(e) => {IdFindSubmit(phoneNum, selectedQuestion, answerQuestion)}}>이메일 확인</SubmitButton>
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
  margin-bottom: 0px;
`;

const PhoneInput = styled.input`
  border-radius: 10px;
  background-color: #fff;
  width: 75%;
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
  width: 72%;
  height: 35px;
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
  font-size: 16px;
  width: 75%;
  padding: 7px 8px;
  border: 1px solid #ffd966;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  border-radius: 10px;
  background-color: #ffd966;
  width: 80%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 26px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
`;

const Formbox = styled.div`
      position: relative;
      margin-top: 22px;

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

export default EmailForm;