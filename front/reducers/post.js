export const initialState = {
    mainPosts : [{
            id: 1,
            User: {
                id:1,
                nickname:"kenny"
            },
            content: "첫번째 게시글임다",
            Images: [{
                    src:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fcocotimes.kr%2Fwp-content%2Fuploads%2Fsites%2F2%2F2020%2F03%2Fpc002029357-1.jpg&imgrefurl=https%3A%2F%2Fcocotimes.kr%2F2020%2F05%2F10%2F%25EC%2583%2588%25EB%2581%25BC-%25EA%25B3%25A0%25EC%2596%2591%25EC%259D%25B4%25EB%25A5%25BC-%25EA%25B1%25B4%25EA%25B0%2595%25ED%2595%2598%25EA%25B2%258C-%25ED%2582%25A4%25EC%259A%25B0%25EA%25B8%25B0-%25EC%259C%2584%25ED%2595%25B4-%25EC%2595%258C%25EC%2595%2584%25EB%2591%25AC%25EC%2595%25BC-%25ED%2595%25A0-%25EA%25B2%2583%2F&tbnid=-j0Sy0oFOQWa9M&vet=12ahUKEwjAz7KshtTrAhWIxGEKHdcaChYQMygAegUIARCoAQ..i&docid=Xz7xcgZGg5IqmM&w=500&h=333&q=%EA%B3%A0%EC%96%91%EC%9D%B4&ved=2ahUKEwjAz7KshtTrAhWIxGEKHdcaChYQMygAegUIARCoAQ"
                },{
                    src:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fs3.ap-northeast-2.amazonaws.com%2Felasticbeanstalk-ap-northeast-2-176213403491%2Fmedia%2Fmagazine_img%2Fmagazine_283%2F5-2-%25EC%258D%25B8%25EB%2584%25A4%25EC%259D%25BC.jpg&imgrefurl=https%3A%2F%2Fpetdoc.co.kr%2Fency%2F283&tbnid=ZOPsSsifQrgDjM&vet=12ahUKEwjAz7KshtTrAhWIxGEKHdcaChYQMygCegUIARCtAQ..i&docid=bcxgoA8l-af67M&w=1125&h=1125&q=%EA%B3%A0%EC%96%91%EC%9D%B4&ved=2ahUKEwjAz7KshtTrAhWIxGEKHdcaChYQMygCegUIARCtAQ"
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