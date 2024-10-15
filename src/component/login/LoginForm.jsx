import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/axios";

function LoginForm() {
    
  //페이지 이동
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', user.email);
      formData.append('password', user.password);

      const response = await api({
        url: '/login',
        method: 'POST',
        data: formData,
        withCredentials: true,
      });
      if (response.status === 200) {
        alert('로그인 성공! ');
        console.log('유저 이메일: ' + response.data.email);
        //console.log('권한: ' + response.data.authorities);
        navigate('/', { state: { userData: response.data } });
      }
    } catch (error) {
      console.log('로그인 에러: ', error);
    }
  };

    return (
        <Form onSubmit={handleSubmit}>
        <InputWrapper>
            <Label htmlFor="email" className="visually-hidden">E-mail</Label>
            <Input  type="email" 
                    placeholder="이메일을 입력해주세요" 
                    name="email"
                    value={user.email} 
                    onChange={handleChange}/>
        </InputWrapper>
        <InputWrapper>
            <Label htmlFor="password" className="visually-hidden">Password</Label>
            <Input  type="password" 
                    placeholder="비밀번호를 입력해주세요"
                    name="password"
                    value={user.password}
                    onChange={handleChange}
                     />
        </InputWrapper>
        <SubmitButton type="submit">로그인</SubmitButton>
        </Form>
    );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin-top: 56px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 12px;
`;

const Label = styled.label`
  &.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
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

export default LoginForm;