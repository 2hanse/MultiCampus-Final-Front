import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api/axios';

function LoginForm() {
  //페이지 이동
  const navigate = useNavigate();

  //로그인 상태저장
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  // 이메일 유효성 검사
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ');
      setIsEmail(false);
    } else {
      setEmailMessage('올바른 이메일 형식이에요 : )');
      setIsEmail(true);
    }
  }, []);

  // 비밀번호 유효성 검사
  const onChangePassword = useCallback((e) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자+특수문자로 8자리이상 입력해주세요');
      setIsPassword(false);
    } else {
      setPasswordMessage('안전한 비밀번호에요 : )');
      setIsPassword(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length <= 8) {
      alert('비밀번호는 8자리 이상이어야 합니다.');
      return;
    }
    if (email === '' || password === '') {
      alert('모두 입력해주세요');
    } else {
      try {
        // console.log(email, password);
        const response = await api.post('/users/login', {
          email: email,
          password: password,
        });
        if (response.status === 200) {
          alert('로그인 성공! ');
          const token = response.data.token;

          localStorage.setItem('token', token);

          navigate('/homepage');
        }
      } catch (error) {
        alert(error.response.data.errMsg);
        // console.log('로그인 에러: ', error);
      }
    }
  };

  const onGuest = () => {
    navigate('/homepage');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <label htmlFor="email" className="security-question-label">
        이메일
      </label>
      <InputWrapper>
        <Input
          type="email"
          placeholder="이메일을 입력해주세요"
          name="email"
          value={email}
          onChange={onChangeEmail}
        />
      </InputWrapper>
      <Formbox>
        {email.length > 0 && (
          <span className={`message ${isEmail ? 'success' : 'error'}`}>
            {emailMessage}
          </span>
        )}
      </Formbox>

      <label htmlFor="password" className="security-question-label">
        비밀번호
      </label>
      <InputWrapper>
        <Input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          name="password"
          value={password}
          onChange={onChangePassword}
        />
      </InputWrapper>
      <Formbox>
        {password.length > 0 && (
          <span className={`message ${isPassword ? 'success' : 'error'}`}>
            {passwordMessage}
          </span>
        )}
      </Formbox>
      <SubmitButton type="submit">로그인</SubmitButton>
      <SubmitButton2 type="button" onClick={onGuest}>
        게스트로 이용하기
      </SubmitButton2>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  width: 78%;
  margin-top: 30px;
  margin-left: 46px;

  .security-question-label {
    color: #ce9971;
    font-size: 15px;
    align-self: flex-start;
    margin-top: 15px;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-top: 3px;
`;

const Formbox = styled.div`
      position: relative;
      margin-top: 0px;

    .message {
      line-height: 24px;
      letter-spacing: -1px;
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

const Input = styled.input`
  border-radius: 10px;
  background-color: #fff;
  width: 100%;
  font-size: 15px;

  padding: 10px 8px;
  border: 1px solid #ffd966;
  box-sizing: border-box;
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
`;

const SubmitButton2 = styled.button`
  border-radius: 10px;
  background-color: #d5cbae;
  width: 100%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 26px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
`;

export default LoginForm;
