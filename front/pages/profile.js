import React from 'react'
import Head from 'next/head';
import AppLayout from '../component/AppLayout'

const Profiles = () => {
    return (
        /* 여기서는 _app.js에서 공통적으로 적용한 Head 스타일을 커스터마이징 함.
        */
        <>
            <Head>
                <title>내 프로퓔 | 거니버드</title>
            </Head>
            <AppLayout>
                <div>My Profile</div>
            </AppLayout>
        </>
    )
}

export default Profiles;