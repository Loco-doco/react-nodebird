import React from "react";
import Head from "next/head";

import AppLayout from "../component/AppLayout";
import RegisterForm from "../component/RegisterForm";

const Register = () => {
  return (
    /* 여기서는 _app.js에서 공통적으로 적용한 Head 스타일을 커스터마이징 함.
     */
    <AppLayout>
      <Head>
        <title>회원가입 | 거니버드</title>
      </Head>
      <RegisterForm />
    </AppLayout>
  );
};

export default Register;
