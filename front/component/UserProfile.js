import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const isLogoutRequest = useSelector((state) => state.user.isLogoutRequest)

    const onLogOut = useCallback((e) => {
        dispatch(logoutRequestAction());
    },[]);

    return (
        <Card
            actions={[
                <div key="twit"> 구겐구겐 <br />{user.Posts.length}</div>,
                <div key="following"> 팔로잉 <br />{user.Followings.length}</div>,
                <div key="follower"> 팔로워 <br />{user.Followers.length}</div>
            ]}
        >
            <Card.Meta 
                avatar = {<Avatar>{user.nickname[0]}</Avatar>}
                title = {user.nickname}
            />
            <Button onClick={onLogOut} loading={isLogoutRequest} >로그아웃</Button>
        </Card>
    )
}

export default UserProfile;