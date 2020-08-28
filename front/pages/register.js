import React from 'react';
import Head from 'next/head';
import AppLayout from '../component/AppLayout';

const Signup= () => {
    return (
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