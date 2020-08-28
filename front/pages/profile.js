import React from 'react'
import Head from 'next/head';
import AppLayout from '../component/AppLayout'

const Profiles = () => {
    return (
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