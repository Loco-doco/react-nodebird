import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
} from "./actions";
import produce from "immer";
import shortId from "shortid";
import faker from "faker";

export const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  isLoadPostRequest: false,
  isLoadPostSuccess: false,
  isLoadPostFailure: null,
  isAddPostRequest: false,
  isAddPostSuccess: false,
  isAddPostFailure: null,
  isRemovePostRequest: false,
  isRemovePostSuccess: false,
  isRemovePostFailure: null,
  isAddCommentRequest: false,
  isAddCommentSuccess: false,
  isAddCommentFailure: null,
};

export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortId.generate(),
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

const dummyPost = (data) => {
  // console.log(`(dummyPost) data.id = ${data.id}`)
  // console.log(`(dummyPost) data.content = ${data.text}`)
  return {
    id: data.id,
    content: data.content,
    User: {
      id: data.userId,
      nickname: data.userNickname,
    },
    Images: [],
    Comments: [],
  };
};

const dummyComment = (data) => ({
  id: 2,
  content: data,
  User: {
    id: 1,
    nickname: "구궤니",
  },
});

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data: data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data: data,
});

const reducer = (state = initialState, action) => {
  // console.log(`It's in post-reducer and data is ${action.data}`)
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_POST_REQUEST:
        draft.isLoadPostRequest = true;
        draft.isLoadPostSuccess = false;
        draft.isLoadPostFailue = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.isLoadPostRequest = false;
        draft.isLoadPostSuccess = true;
        draft.hasMorePost = draft.mainPosts.length < 50;
        break;
      case LOAD_POST_FAILURE:
        draft.isLoadPostRequest = false;
        draft.isLoadPostFailue = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.isAddPostRequest = true;
        draft.isAddPostSuccess = false;
        draft.isAddPostFailue = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.isAddPostRequest = false;
        draft.isAddPostSuccess = true;
        break;
      case ADD_POST_FAILURE:
        draft.isAddPostRequest = false;
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
        draft.isRemovePostSuccess = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.isRemovePostRequest = false;
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
        break;
    }
  });
};

export default reducer;
