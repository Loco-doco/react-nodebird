import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, FOLLOW_REQUEST, UNFOLLOW_REQUEST, FOLLOW_SUCCESS, FOLLOW_FAILURE, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE
    } from '../reducers/actions';

import { all, delay, fork, put, takeLatest } from "redux-saga/effects";


function unFollowUserAPI(data) {
    return axios.post('api/unFollowUser')
}

function* unFollowUser(action){
    try{
        // const result = yield call(unFollowUserAPI, action.data)
        // console.log('saga - logIn Generator Func activated')
        // yield delay(2000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data
        })
    } catch(e) {
        yield put({
            type: UNFOLLOW_FAILURE,
            error: e.response.data
        })
    }
}

function followUserAPI(data) {
    return axios.post('api/followUser')
}

function* followUser(action){
    try{
        // const result = yield call(followUserAPI, action.data)
        // console.log('saga - logIn Generator Func activated')
        // yield delay(2000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data
        })
    } catch(e) {
        yield put({
            type: FOLLOW_FAILURE,
            error: e.response.data
        })
    }
}

function logInAPI(data) {
    return axios.post('/api/login', data);
  }
  
  function* logIn(action) {
    try {
      console.log('saga logIn');
      // const result = yield call(logInAPI);
      yield delay(1000);
      yield put({
        type: LOG_IN_SUCCESS,
        data: action.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOG_IN_FAILURE,
        error: err.response.data,
      });
    }
  }

function logoutAPI() {
    return axios.post('api/logout')
}

function* logOut(){
    try{
        // const result = yield call(logoutAPI)
        console.log('saga - logout Generator Func is activated')
        yield delay(2000);
        yield put({
            type: LOG_OUT_SUCCESS,
            // data: result.data
        })
    } catch(e) {
        yield put({
            type: LOG_OUT_FAILURE,
            error: e.response.data
        })
    }
}

function signUpAPI() {
    return axios.post('api/signup')
}

function* signUp(){
    try{
        // const result = yield call(logoutAPI)
        console.log('saga - signUp Generator Func is activated')
        yield delay(1000);
        yield put({
            type: SIGNUP_SUCCESS,
            // data: result.data
        })
    } catch(e) {
        yield put({
            type: SIGNUP_FAILURE,
            error: e.response.data
        })
    }
}

function* watchUnFollow() {
    console.log('saga - watchUnFollow activated')
    yield takeLatest(UNFOLLOW_REQUEST, unFollowUser);
}

function* watchFollow() {
    console.log('saga - watchFollow activated')
    yield takeLatest(FOLLOW_REQUEST, followUser);
}

function* watchLogIn() {
    console.log('saga - watchLogin activated')
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    console.log('saga - watchLogOut activated')
    yield takeLatest(LOG_OUT_REQUEST, logOut)
}

function* watchSignUp() {
    console.log('saga - watchSignup activated')
    yield takeLatest(SIGNUP_REQUEST, signUp)
}

export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchUnFollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp)
    ])
}