import React, { useCallback, useEffect, useState } from "react";
import { useInput } from "../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';

import { SIGNUP_REQUEST } from "../reducers/actions";

import styled from "styled-components";
import { Form, Input, Checkbox, Button } from "antd";


const ErrorMessage = styled.div`
  color: red;
`;

const SubmitButtonWrapper = styled.div`
  margin-top: 10px;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { isSignUpRequest, isSignUpSuccess, isSignUpFailure }= useSelector((state) => state.user);

  useEffect(() => {
    if(isSignUpSuccess) {
      Router.push('/')
    }
  }, [isSignUpSuccess])

  useEffect(() => {
    if(isSignUpFailure) {
      alert(isSignUpFailure)
    }
  }, [isSignUpFailure])

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password);
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const [term, setTerm] = useState("");
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback((e) => {
    setTerm(e.target.checked);
    setTermError(false);
  });

  const onSubmit = useCallback(
    (e) => {
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      return dispatch({
        type: SIGNUP_REQUEST,
        data: {
          email,
          password,
          nickname,
        },
      });
    },
    [email, nickname, password, passwordCheck, term]
  );

  return (
    <Form onFinish={onSubmit}>
      <div>
        <label htmlFor="user-email">아이디</label>
        <br />
        <Input
          name="user-email"
          type="email"
          value={email}
          required
          onChange={onChangeEmail}
        />
      </div>
      <div>
        <label htmlFor="user-nickname">닉네임</label>
        <br />
        <Input
          name="user-nickname"
          value={nickname}
          required
          onChange={onChangeNickname}
        />
      </div>
      <div>
        <label htmlFor="user-password">패스워드</label>
        <br />
        <Input
          name="user-password"
          type="password"
          value={password}
          required
          onChange={onChangePassword}
        />
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
        {passwordError && (
          <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
        )}
      </div>
      <div>
        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          {" "}
          거니 말을 잘 들을 것을 동의합니다.
        </Checkbox>
        {termError && <ErrorMessage>약관에 동의하셔야 합니다.</ErrorMessage>}
      </div>
      <SubmitButtonWrapper>
        <Button type="primary" htmlType="submit" loading={isSignUpRequest}>
          {" "}
          가입하기{" "}
        </Button>
      </SubmitButtonWrapper>
    </Form>
  );
};

export default RegisterForm;
