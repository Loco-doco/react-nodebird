export const initialState = {
    mainPosts : [{
            id: 1,
            User: {
                id:1,
                nickname:"kenny"
            },
            content: "첫번째 게시글임다",
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
    postAdded : false,
};

const ADD_POST = 'ADD_POST'
export const addPost = {
    type : ADD_POST
}

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

const reducer = (state = initialState, action) => {
    switch (action.type){
        case ADD_POST:
            return {
                ...state,
                // component에서 map함수를 쓸 예정이므로 mainPosts는 array형태가 되어야 함. (object X)
                mainPosts : [
                    dummyPost,
                    ...state.mainPosts,
                ],
                postAdded: true
                
            }
        default:
            return state;
    }
}

export default reducer;