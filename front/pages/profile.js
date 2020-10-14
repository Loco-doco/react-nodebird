import React, { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";

import AppLayout from "../component/AppLayout";
import NicknameEditForm from "../component/NicknameEditForm";
import FollowList from "../component/FollowList";
import { useSelector } from "react-redux";

const Profiles = () => {
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (!(user && user.id)) {
      Router.push("/");
    }
  }, [user && user.id]);

  if (!user) {
    return null;
  }

  return (
    /* 여기서는 _app.js에서 공통적으로 적용한 Head 스타일을 커스터마이징 함.
     */
    <>
      <Head>
        <title>내 프로퓔 | 거니버드</title>
      </Head>
      <AppLayout>
        <NicknameEditForm header="닉네임 변경" />
        <FollowList header="팔로잉 목록" data={user.Followings} />
        <FollowList header="팔로워 목록" data={user.Followers} />
      </AppLayout>
    </>
  );
};
export default Profiles;
