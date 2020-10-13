import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE
    } from './actions'
import produce from 'immer';
import shortId from 'shortid'

export const initialState = {
    mainPosts : [{
            id: shortId.generate(),
            User: {
                id: shortId.generate(),
                nickname:"kenny"
            },
            content: "첫번째 게시글임다 #태그1#태그2 #태그3",
            Images: [{
                    id: shortId.generate(),
                    src:"https://cocotimes.kr/wp-content/uploads/sites/2/2020/03/pc002029357-1.jpg"
                },{
                    id: shortId.generate(),
                    src:"https://i.pinimg.com/originals/60/6b/3d/606b3d53635879b3ce083c5b2ca1080b.jpg"
                },{
                    id: shortId.generate(),
                    src:"https://i.pinimg.com/originals/60/6b/3d/606b3d53635879b3ce083c5b2ca1080b.jpg"
                }
            ],
            Comments: [{
                    id: shortId.generate(),
                    User:{
                        id: shortId.generate(),
                        nickname:"kennykim"
                    },
                    content: "우와 댓글1"
                },{
                    id: shortId.generate(),
                    User:{
                        id: shortId.generate(),
                        nickname:"kookenny"
                    },
                    content: "우와 댓글2"
                }
            ]   
        }
    ],
    imagePaths : [],
    isAddPostRequest : false,
    isAddPostSuccess : false,
    isAddPostFailure : null,
    isRemovePostRequest : false,
    isRemovePostSuccess : false,
    isRemovePostFailure : null,
    isAddCommentRequest : false,
    isAddCommentSuccess : false,
    isAddCommentFailure : null
};

const dummyPost = (data) =>{
    console.log(`(dummyPost) data.id = ${data.id}`)
    console.log(`(dummyPost) data.content = ${data.text}`)
    return {
        id: data.id,
        content: data.content,
        User: {
            id: 1,
            nickname: '구궤니',
        },
        Images: [],
        Comments: [],
    }
}


const dummyComment = (data) => ({
    id: 2,
    content: data,
    User: {
        id: 1,
        nickname: '구궤니',
    },
})

export const addPost = (data) => ({
    type : ADD_POST_REQUEST,
    data : data
});

export const addComment = (data) => ({
    type : ADD_COMMENT_REQUEST,
    data : data
});


const reducer = (state = initialState, action) => {
    console.log(`It's in post-reducer and data is ${action.data}`)
    return produce(state, (draft) => {
        switch (action.type){
            case ADD_POST_REQUEST:
                draft.isAddPostRequest = true;
                draft.isAddPostSuccess = false;
                draft.isAddPostFailue = null;
                break;
            case ADD_POST_SUCCESS:
                draft.mainPosts = [
                    dummyPost(action.data),
                    ...state.mainPosts,
                ];
                draft.isAddPostRequest = false;
                draft.isAddPostSuccess = true;
                break;
            case ADD_POST_FAILURE:
                draft.isAddPostSuccess = false;
                draft.isAddPostFailue = action.error;
                break;
            case REMOVE_POST_REQUEST:
                draft.isRemovePostRequest = true;
                draft.isRemovePostSuccess = false;
                draft.isRemovePostFailue = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
                draft.isRemovePostRequest = false;
                draft.isRemovePostSuccess= true;
                break;
            case REMOVE_POST_FAILURE:
                draft.isRemovePostSuccess = false;
                draft.isRemovePostFailue = action.error;
                break;
            case ADD_COMMENT_REQUEST:
                draft.isAddCommentRequest = true;
                draft.isAddCommentSuccess = false;
                draft.isAddCommentFailue = null;
                break;
            case ADD_COMMENT_SUCCESS: {
                const post = draft.mainPosts.find((v) => v.id === action.data.postId);
                post.Comments.unshift(dummyComment(action.data.content));
                draft.isAddCommentRequest = false;
                draft.isAddCommentSuccess = true;
                break;
                // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
                // const post = { ...state.mainPosts[postIndex] };
                // post.Comments = [dummyComment(action.data.content), ...post.Comments];
                // const mainPosts = [...state.mainPosts];
                // mainPosts[postIndex] = post;
    
                // return {
                //     ...state,
                //     mainPosts,
                //     isAddCommentRequest : false,
                //     isAddCommentSuccess: true
                // }
            }
            case ADD_COMMENT_FAILURE:
                draft.isAddCommentSuccess = false;
                draft.isAddCommentFailue = action.error;
                break;
            default:
                break
        }
    })
}

export default reducer;