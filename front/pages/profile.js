import React from 'react'
import Head from 'next/head';

import AppLayout from '../component/AppLayout'
import NicknameEditForm from '../component/NicknameEditForm'
import FollowList from '../component/FollowList'

const Profiles = () => {
    const followingList = [
        {nickname : "김건희"},
        {nickname : "전민주"},
        {nickname : "김무장"}
    ]

    const followerList = [
        {nickname : "전사랑"},
        {nickname : "추사랑"},
        {nickname : "끝사랑"}
    ]

    return (
        /* 여기서는 _app.js에서 공통적으로 적용한 Head 스타일을 커스터마이징 함.
        */
        <>
            <Head>
                <title>내 프로퓔 | 거니버드</title>
            </Head>
            <AppLayout>
                <NicknameEditForm header = "닉네임 변경"/>
                <FollowList header = "팔로잉 목록" data = {followingList}/>
                <FollowList header = "팔로워 목록" data = {followerList}/>
            </AppLayout>
        </>
    )
}
export default Profiles;