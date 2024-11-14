import { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../api/axios";

const ResetPasswordForm = () => {

    // 페이지 이동
    const navigate = useNavigate();

    // 페이지 간 데이터 가져오기
    const location = useLocation();

    // 객체 데이터 담기
    const userInfo = {...location.state};

    // 현재 비밀번호 상태저장
    const [nowPassword, setNowPassword] = useState('');
    // 새 비밀번호 상태저장
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    // 오류메시지 상태저장
    const [nowPasswordMessage, setNowPasswordMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');

    // 유효성 검사 상태저장
    const [isNowPassword, setIsNowPassword] = useState(false);
    const [isPassword, setIsPassword] = useState(false);
    const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

    // 현재 비밀번호 유효성 검사
    const onChangeNowPassword = useCallback((e) => {
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/
        const passwordCurrent = e.target.value
        setNowPassword(passwordCurrent)
    
        if (!passwordRegex.test(passwordCurrent)) {
            setNowPasswordMessage('숫자+영문자+특수문자로 8자리이상 입력해주세요')
            setIsNowPassword(false)
        } else {
            setNowPasswordMessage('안전한 비밀번호에요 : )')
            setIsNowPassword(true)
        }
        }, [])

    // 새 비밀번호 유효성 검사
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPwd = {
            oldPassword: nowPassword,
            newPassword: password
        };
        if(password === "" || passwordConfirm === "") {
            alert("모두 입력해주세요");
        } else {
        try {
            const response = await api.put("/users/me/change-password", newPwd);
            if (response.status === 200) {
                //console.log('새 비밀번호: ' + response.data.new_password); 
                navigate('/user/me/changePasswordResult');
            }
        } catch (err) {
            console.log('비밀번호 에러: ', err);
            alert(err);
        }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <label htmlFor="password" className="security-question-label">현재 비밀번호</label>
            <InputWrapper>
                <Input  type="password" 
                        placeholder="현재 비밀번호" 
                        onChange={onChangeNowPassword}
                        className="input2"/>
            </InputWrapper>
            <Formbox>
                {nowPassword.length > 0 && (
                    <span className={`message ${isNowPassword ? 'success' : 'error'}`}>{nowPasswordMessage}</span>
                )}
            </Formbox>

            <label htmlFor="password" className="security-question-label">새 비밀번호</label>
            <InputWrapper>
                <Input  type="password" 
                        placeholder="새 비밀번호(숫자+영문+특수문자 8자리 이상)" 
                        onChange={onChangePassword}
                        className="input2"/>
            </InputWrapper>
            <Formbox>
                {password.length > 0 && (
                    <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
                )}
            </Formbox>

            <label htmlFor="password" className="security-question-label">새 비밀번호 재입력</label>
            <InputWrapper>
                <Input  type="password" 
                        placeholder="새 비밀번호 재입력" 
                        onChange={onChangePasswordConfirm}
                        className="input2"/>
            </InputWrapper>
            <Formbox>
                {passwordConfirm.length > 0 && (
                    <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
                )}
            </Formbox>

            
            <SubmitButton type="submit">비밀번호 변경하기</SubmitButton>
        </Form>
    )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  width: 80%;
  margin-top: 100px;
  margin-left: 46px;

  .security-question-label {
    color: #ce9971;
    font-size: 15px;
    align-self: flex-start;
    margin-top: 15px;
  }
`;

const InputWrapper = styled.div`
  width: 96%;
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
  width: 96%;
  font-size: 19px;
  color: #785a00;
  white-space: nowrap;
  text-align: center;
  margin: 26px 0 0 0px;
  padding: 10px 8px;
  border: none;
  cursor: pointer;
`;

export default ResetPasswordForm;