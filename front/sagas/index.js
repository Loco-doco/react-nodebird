import { applyMiddleware } from "redux";
import { all, fork, call, take, put } from 'redux-saga/effects';
import axios from 'axios';

function loginAPI() {
    return axios.post('api/login')
}

function* logIn(){
    try{
        const result = yield call(loginAPI)
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data
        })
    } catch(e) {
        yield put({
            type: 'LOG_IN_FAILURE',
            data: e.response.data
        })
    }
}

function logoutAPI() {
    return axios.post('api/logout')
}

function* logOut(){
    try{
        const result = yield call(logoutAPI)
        yield put({
            type: 'LOG_OUT_SUCCESS',
            data: result.data
        })
    } catch(e) {
        yield put({
            type: 'LOG_OUT_FAILURE',
            data: e.response.data
        })
    }
}

function* watchLogIn() {
    yield take('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield take('LOG_OUT_REQUEST', logOut)
}

function* watchAddPost(){
    yield take('ADD_POST_REQUEST')
}

export default function* rootSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchAddPost)
    ])
}