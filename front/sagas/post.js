import { all, delay, fork, put, takeLatest } from "redux-saga/effects";
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
    } from '../reducers/actions'

function addPostAPI() {
    return axios.post('api/addPost')
}

function* addPost(){
    try{
        // const result = yield call(addPostAPI)
        yield delay(2000);
        yield put({
            type: ADD_POST_SUCCESS,
            // data: result.data
        })
    } catch(e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e.response.data
        })
    }
}

function addCommentAPI() {
    return axios.post('api/addPost')
}

function* addComment(){
    try{
        // const result = yield call(addCommentAPI)
        yield delay(2000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            // data: result.data
        })
    } catch(e) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            error: e.response.data
        })
    }
}


function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchAddComment)
    ])
}