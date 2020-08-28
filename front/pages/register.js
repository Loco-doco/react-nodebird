import React from 'react';
import Head from 'next/head';
import AppLayout from '../component/AppLayout';

const Signup= () => {
    return(
        /* 여기서는 _app.js에서 공통적으로 적용한 Head 스타일을 커스터마이징 함.
        */
        <>
            <Head>
                <title>회원가입 | 거니버드</title>
            </Head>
            <AppLayout>
                <div>My Signup</div>
            </AppLayout>
        </>
    )
}

export default Signup;