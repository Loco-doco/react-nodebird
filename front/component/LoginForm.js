import React, { useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

import useInput from '../hooks/useInput';

import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

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
    padding : 10px;
`

const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');

    /*
    Submit 되었을 때 콜백 함수. id, password를 받고 setIsLoggedIn 상태를 true로 변경.
    */
    const onSubmitForm = useCallback((e) => {
        console.log(id, password)
        dispatch(loginAction({id, password}));
    }, [id, password]);
    
    return (
        <FormWrapper
            onFinish={onSubmitForm} // Submit 되었을 때 콜백
        >
            <InputWrapper>
                <label htmlFor="user-id"> 아이디 </label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
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
                    loading={false}
                >
                로그인
                </Button>
                <Link href="/register"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
}

export default LoginForm;