import React, { useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

import { useInput } from '../hooks/useInput';

import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

/*
버튼 감싸는 CSS를 styled로 재정의한다. 
왜냐면, div 태그에다가 직접 수정할 시 일일히 다 리렌더링 되기 때문
*/
const ButtonWrapper = styled.div`
    margin-top : 10px;
`
const InputWrapper = styled.div`
    margin-top : 10px;
    margin-bottom : 5px;
`

const FormWrapper = styled(Form)`
    padding : 20px;
`

const LoginForm = () => {
    const dispatch = useDispatch();
    const isLoginRequest = useSelector((state) => state.user.isLoginRequest);
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    /*
    Submit 되었을 때 콜백 함수. email, password를 받고 setIsLoggedIn 상태를 true로 변경.
    */
    const onSubmitForm = useCallback((e) => {
        dispatch(loginRequestAction({email, password}));
    }, [email, password]);
    
    return (
        <FormWrapper
            onFinish={onSubmitForm} // Submit 되었을 때 콜백
        >
            <InputWrapper>
                <label htmlFor="user-email"> 이메일 </label>
                <br />
                <Input name="user-email" type='email' value={email} onChange={onChangeEmail} required />
            </InputWrapper>
            <InputWrapper>
                <label htmlFor="user-password"> 패스워드 </label>
                <br />
                <Input
                    name="user-password"
                    type="password"
                    value={password}
                    onChange={onChangePassword} required 
                />
            </InputWrapper>
            <ButtonWrapper>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoginRequest}
                >
                    로그인
                </Button>
                <Link href="/register"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default LoginForm;