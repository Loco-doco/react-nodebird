import React, { useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';

/*
버튼 감싸는 CSS를 styled로 재정의한다. 
왜냐면, div 태그에다가 직접 수정할 시 일일히 다 리렌더링 되기 때문
*/
const ButtonWrapper = styled.div`
    margin-top : 10px
`
const InputWrapper = styled.div`
    margin-bottom : 5px,
    margin-top : 5px
`



const LoginForm = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value)
    }, []);
    
    const onChangePassword = useCallback((e) => {
        setPassword(e.target.value)
    }, []);
    
    return (
        <Form>
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
            </ButtonWrapper>>
            <div>
            
            </div>
        </Form>
    );
}

export default LoginForm;