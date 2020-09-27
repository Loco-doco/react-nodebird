import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
    } from '../reducers/actions';

import { all, delay, fork, put, takeLatest } from "redux-saga/effects";


function loginAPI(data) {
    return axios.post('api/login')
}

function* logIn(action){
    try{
        // const result = yield call(loginAPI, action.data)
        console.log('saga - logIn Generator Func activated')
        // yield delay(2000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data
        })
    } catch(e) {
        yield put({
            type: LOG_IN_FAILURE,
            error: e.response.data
        })
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
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp)
    ])
}