import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Menu, Input, Row, Col } from 'antd';

const AppLayout = ({ children }) => {
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
                    <Input.Search
                        onSearch={value => console.log(value)}
                        style = {{ verticalAlign: "middle"}}
                        enterButton/>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/register"><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row>
                <Col xs={24} md={6}>
                    왼쪽메뉴
                </Col>
                <Col xs={24} md={12}>
                    <li>gkdl</li>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    오른쪽 메뉴
                </Col>
            </Row>
        </div>
    )
}

AppLayout.propTypes = {
    children: PropTypes.node.isRequired
}

export default AppLayout