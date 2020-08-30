import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Checkbox, Button } from 'antd';

import useInput from '../hooks/useInput';

const ErrorMessage = styled.div`
    color: red;
`

const SubmitButtonWrapper = styled.div`
    margin-top: 10px;
`;


const RegisterForm = () => {
    const [id, onChangeId] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password)
        setPasswordCheck(e.target.value)
    },[password]);

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    })

    const onSubmit = useCallback((e) => {
        if(password !== passwordCheck){
            return setPasswordError(true)
        }
        if(!term){
            return setTermError(true)
        }
    },[password, passwordCheck, term]);
    return (
        <Form onFinish={onSubmit}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br />
                <Input name="user-id" value={id} required onChange={onChangeId} />
            </div>
            <div>
                <label htmlFor="user-nickname">닉네임</label>
                <br />
                <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
            </div>
            <div>
                <label htmlFor="user-password">패스워드</label>
                <br />
                <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
            </div>
            <div>
                <label htmlFor="user-password-check">비밀번호체크</label>
                <br />
                <Input
                name="user-password-check"
                type="password"
                value={passwordCheck}
                required
                onChange={onChangePasswordCheck}
                />
            {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
            </div>
            <div>
                <Checkbox
                    name="user-term"
                    checked={term}
                    onChange={onChangeTerm}
                > 거니 말을 잘 들을 것을 동의합니다.</Checkbox>
                {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
            </div>
            <SubmitButtonWrapper>
                <Button type='primary' htmlType='submit'> 가입하기 </Button>
            </SubmitButtonWrapper>
        </Form>
    )
}

export default RegisterForm;