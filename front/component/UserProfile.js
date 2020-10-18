import React, { useCallback, useEffect } from "react";
import { Card, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import { Router } from "next/router";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const {isLogoutRequest} = useSelector((state) => state.user);

  const onLogOut = useCallback((e) => {
    dispatch(logoutRequestAction());
    // Router.push('/')
  }, []);

  return (
    <Card
      actions={[
        <div key="twit">
          {" "}
          {user.nickname} <br />
          {user.Posts.length}
        </div>,
        <div key="following">
          {" "}
          팔로잉 <br />
          {user.Followings.length}
        </div>,
        <div key="follower">
          {" "}
          팔로워 <br />
          {user.Followers.length}
        </div>,
      ]}
    >
      <Card.Meta
        avatar={<Avatar>{user.nickname}</Avatar>}
        title={user.nickname}
      />
      <Button onClick={onLogOut} loading={isLogoutRequest}>
        로그아웃
      </Button>
    </Card>
  );
};

export default UserProfile;
