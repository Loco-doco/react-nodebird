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