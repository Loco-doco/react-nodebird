/*
_app.js 파일은 next.js 에서 쓰이는 파일로,
pages 안에 있는 페이지에 공통적으로 적용할 css들을 정리할 수 있다.
*/

import React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import wrapper from "../store/configureStore";
import withReduxSaga from "next-redux-saga";
import "antd/dist/antd.css";

const kennyBird = ({ Component }) => {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>kennyBird</title>
      </Head>
      <Component />
    </>
  );
};

kennyBird.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default wrapper.withRedux(withReduxSaga(kennyBird)); // wrapper로 감싼 redux store를 kennyBird 컴포넌트에 일괄 적용
/* 
wrapper를 안쓰면
withredux(configureStore)(kennyBird)
이런식으로 쓸 수 있음
*/
