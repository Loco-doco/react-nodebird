import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import UserProfile from '../component/UserProfile';
import LoginForm from '../component/LoginForm';

const SearchInput = styled(Input.Search)`
    vertical-align : middle
`

const AppLayout = ({ children }) => {
    /*
    isLoggedIn, setIsLoggedIn 상태를 false로 설정(default)
    */
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return(
        <div>
            <Menu mode="horizontal">
                <Menu.Item>
                    <Link href="/"><a>거니버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <SearchInput
                        onSearch={value => console.log(value)}
                        enterButton/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/register"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6}>
                    {/*isLoggedIn이 True면 UserProfile에 setIsLoggedIn 상태를 담아서, 아니면 LoginForm을 현재 setIsLoggedIn 상태를 담아 호출*/}
                    {isLoggedIn ? <UserProfile setIsLoggedIn={setIsLoggedIn}/> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    <a href="https://naver.com" target="_blank" rel="noreferrer noopener">SenzTV</a>
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppLayout