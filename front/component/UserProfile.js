import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';

const UserProfile = ({ setIsLoggedIn }) => {

    /*
    로그아웃 버튼 눌렀을 떄의 콜백 함수
    setIsLoggedIn 상태 변경
    */
    const onLogOut = useCallback((e) => {
        setIsLoggedIn(false);
    },[]);

    return (
        <Card
            actions={[
                <div key="twit"> 구겐구겐 <br />0</div>,
                <div key="following"> 팔로잉 <br />0</div>,
                <div key="follower"> 팔로워 <br />0</div>
            ]}
        >
            <Card.Meta 
                avatar = {<Avatar>ZC</Avatar>}
                title = "kennybird"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    )
}

export default UserProfile;