import React  from 'react';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import UserProfile from '../component/UserProfile';
import LoginForm from '../component/LoginForm';

import { useSelector } from 'react-redux';

const SearchInput = styled(Input.Search)`
    vertical-align : middle
`

const AppLayout = ({ children }) => {
    /*
    isLoggedIn, setIsLoggedIn 상태를 false로 설정(default)
    */
    const user = useSelector((state)=> {
        // _app.js에서 withRedux로 스토어들에 접근간으하게 해뒀고 useSelector는 그 store값을 조회할 수 있는 권한이 생김
        return state.user.user
    })

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
                    {user ? <UserProfile /> : <LoginForm />}
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

export default AppLayout