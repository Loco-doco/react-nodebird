import { all, delay, fork, put, takeLatest, throttle } from "redux-saga/effects";
import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    ADD_POST_TO_ME, REMOVE_POST_OF_ME, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE
    } from '../reducers/actions'
import { generateDummyPost } from '../reducers/post'
import shortId from 'shortid';

function loadPostAPI() {
    return axios.post('api/loadPost')
}

function* loadPost(action){
    try{
        console.log(`(Saga-loadPost) action is ${action}`)
        yield delay(1000);
        const id = shortId.generate();
        yield put({
            type: LOAD_POST_SUCCESS,
            data: generateDummyPost(10)
        })
    } catch(e) {
        yield put({
            type: LOAD_POST_FAILURE,
            error: e.response.data
        })
    }
}

function addPostAPI() {
    return axios.post('api/addPost')
}

function* addPost(action){
    try{
        console.log(`(Saga-addPost) action is ${action.data.content}`)
        yield delay(2000);
        const id = shortId.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                id: id,
                content: action.data.content
            }
        })
        yield put({
            type: ADD_POST_TO_ME,
            data: id
        })
    } catch(e) {
        yield put({
            type: ADD_POST_FAILURE,
            error: e.response.data
        })
    }
}

function removePostAPI() {
    return axios.post('api/removePost')
}

function* removePost(action){
    try{
        console.log(`(Saga-removePost) action is ${action.data}`)
        yield delay(2000);
        const id = shortId.generate();
        yield put({
            type: REMOVE_POST_SUCCESS,
            data: action.data
        })
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
        })
    } catch(e) {
        yield put({
            type: REMOVE_POST_FAILURE,
            error: e.response.data
        })
    }
}

function addCommentAPI() {
    return axios.post('api/addPost')
}

function* addComment(action){
    try{
        console.log(`(Saga-addComment) action is ${action.data}`)
        yield delay(1000);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
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

function* watchLoadPost(){
    yield throttle(2000, LOAD_POST_REQUEST, loadPost)
}

function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost)
}

function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment)
}

export default function* postSaga(){
    yield all([
        fork(watchAddPost),
        fork(watchLoadPost),
        fork(watchRemovePost),
        fork(watchAddComment)
    ])
}