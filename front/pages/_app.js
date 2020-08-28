/*
_app.js 파일은 next.js 에서 쓰이는 파일로,
pages 안에 있는 페이지에 공통적으로 적용할 css들을 정리할 수 있다.
*/

import React from 'react';
import propTypes from 'prop-types';
import Head from 'next/head';
import 'antd/dist/antd.css'


const kennyBird = ( {Component} ) => {
    return (
        <>
            <Head>
                <meta charSet = "UTF-8" />
                <title>kennyBird</title>
            </Head>
            <Component />
        </>
    )
}

kennyBird.PropTypes = {
    Component: propTypes.elementType.isRequired,
}

export default kennyBird;