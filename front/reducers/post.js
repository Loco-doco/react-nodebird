import {
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE,
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
    } from './actions'

export const initialState = {
    mainPosts : [{
            id: 1,
            User: {
                id:1,
                nickname:"kenny"
            },
            content: "첫번째 게시글임다 #태그1#태그2 #태그3",
            Images: [{
                    src:"https://cocotimes.kr/wp-content/uploads/sites/2/2020/03/pc002029357-1.jpg"
                },{
                    src:"https://i.pinimg.com/originals/60/6b/3d/606b3d53635879b3ce083c5b2ca1080b.jpg"
                },{
                    src:"https://i.pinimg.com/originals/60/6b/3d/606b3d53635879b3ce083c5b2ca1080b.jpg"
                }
            ],
            Comments: [{
                    User:{
                        nickname:"kennykim"
                    },
                    content: "우와 댓글1"
                },{
                    User:{
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
    isAddCommentRequest : false,
    isAddCommentSuccess : false,
    isAddCommentFailure : null
};

const dummyPost = {
    id: 2,
    content: '더미데이터입니다.',
    User: {
        id: 1,
        nickname: '구궤니',
    },
    Images: [],
    Comments: [],
}

export const addPost = (data) => ({
    type : ADD_POST_REQUEST,
    data : data
});

export const addComment = (data) => ({
    type : ADD_COMMENT_REQUEST,
    data : data
});

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST_REQUEST:
            return {
                ...state,
                isAddPostRequest: true,
                isAddPostSuccess: false,
                isAddPostFailue: null
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                // component에서 map함수를 쓸 예정이므로 mainPosts는 array형태가 되어야 함. (object X)
                mainPosts : [
                    dummyPost,
                    ...state.mainPosts,
                ],
                isAddPostRequest : false,
                isAddPostSuccess: true
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                isAddPostSuccess: false,
                isAddPostFailue : action.error
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                isAddCommentRequest: true,
                isAddCommentSuccess: false,
                isAddCommentFailue: null
            }
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                isAddCommentRequest : false,
                isAddCommentSuccess: true
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                isAddCommentSuccess: false,
                isAddCommentFailue : action.error
            }
        default:
            return state;
    }
}

export default reducer;