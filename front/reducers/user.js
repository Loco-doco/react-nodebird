import {
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_IN_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  CHANGE_NICKNAME_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILURE,
} from "./actions";
import produce from "immer";

export const initialState = {
  isLoginRequest: false,
  isLoginSuccess: false,
  isLoginFailure: null,
  isLogoutRequest: false,
  isLogoutSuccess: false,
  isLogoutFailure: null,
  isSignUpRequest: false,
  isSignUpSuccess: false,
  isSignUpFailure: null,
  isChangeNicknameRequest: false,
  isChangeNicknameSuccess: false,
  isChangeNicknameFailure: null,
  isFollowRequest: false,
  isFollowSuccess: false,
  isFollowFailure: null,
  isUnFollowRequest: false,
  isUnFollowSuceess: false,
  isUnFollowFailure: null,
  user: null,
  signUpData: {},
  loginData: {},
};

const dummyUser = (data) => ({
  ...data,
  nickname: "kenny",
  id: 1,
  Posts: [],
  Followings: [
    { nickname: "kenny" },
    { nickname: "kenny" },
    { nickname: "kenny" },
  ],
  Followers: [
    { nickname: "kenny" },
    { nickname: "kenny" },
    { nickname: "kenny" },
  ],
});

export const loginRequestAction = (data) => {
  console.log('reducer - "loginRequestAction" is activated and data is ', data);
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = (data) => {
  console.log('reducer - "logoutRequestAction" is activated');
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case FOLLOW_REQUEST:
        // console.log(`reducer - ${FOLLOW_REQUEST} activated and I got action like ${action}`)
        draft.isFollowRequest = true;
        draft.isFollowSuccess = false;
        draft.isFollowFailure = null;
        break;
      case FOLLOW_SUCCESS:
        console.log('reducer - "FOLLOW_SUCCESS" activated');
        draft.isFollowRequest = false;
        draft.isFollowSuccess = true;
        draft.user.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        console.log('reducer - "FOLLOW_FAILURE" activated');
        draft.isFollowRequest = false;
        draft.isFollowFailure = action.error;
        break;

      case UNFOLLOW_REQUEST:
        // console.log(`reducer - ${UNFOLLOW_REQUEST} activated and I got action like ${action}`)
        draft.isUnFollowRequest = true;
        draft.isUnFollowSuccess = false;
        draft.isUnFollowFailure = null;
        break;
      case UNFOLLOW_SUCCESS:
        console.log('reducer - "UNFOLLOW_SUCCESS" activated');
        draft.isUnFollowRequest = false;
        draft.isUnFollowSuccess = true;
        draft.user.Followings = draft.user.Followings.filter(
          (v) => v.id !== action.data
        );
        break;
      case UNFOLLOW_FAILURE:
        console.log('reducer - "UNFOLLOW_FAILURE" activated');
        draft.isUnFollowRequest = false;
        draft.isUnFollowFailure = action.error;
        break;

      case LOG_IN_REQUEST:
        // console.log(`reducer - ${LOG_IN_REQUEST} activated and I got action like ${action}`)
        draft.isLoginRequest = true;
        draft.isLoginSuccess = false;
        draft.isLoginFailure = null;
        break;
      case LOG_IN_SUCCESS:
        console.log('reducer - "LOG_IN_SUCCESS" activated');
        draft.isLoginRequest = false;
        draft.isLoginSuccess = true;
        draft.user = dummyUser(action.data);
        break;
      case LOG_IN_FAILURE:
        console.log('reducer - "LOG_IN_FAILURE" activated');
        draft.isLoginRequest = false;
        draft.isLoginFailure = action.error;
        break;

      case LOG_OUT_REQUEST:
        console.log('reducer - "LOG_OUT_REQUEST" activated');
        draft.isLogoutRequest = true;
        draft.isLogoutSuccess = false;
        draft.isLogoutFailure = null;
        break;
      case LOG_OUT_SUCCESS:
        console.log('reducer - "LOG_OUT_SUCCESS" activated');
        draft.isLogoutRequest = false;
        draft.isLogoutSuccess = true;
        draft.user = null;
        break;
      case LOG_OUT_FAILURE:
        console.log('reducer - "LOG_OUT_FAILURE" activated');
        draft.isLogoutRequest = false;
        draft.isLogoutFailure = action.error;
        break;

      case SIGNUP_REQUEST:
        console.log('reducer - "SIGNUP_REQUEST" activated');
        draft.isSignUpRequest = true;
        draft.isSignUpSuccess = false;
        draft.isSignUpFailure = null;
        break;
      case SIGNUP_SUCCESS:
        console.log('reducer - "SIGNUP_SUCCESS" activated');
        draft.isSignUpRequest = false;
        draft.isSignUpSuccess = true;
        break;
      case SIGNUP_FAILURE:
        console.log('reducer - "SIGNUP_FAILURE" activated');
        draft.isSignUpRequest = false;
        draft.isSignUpFailure = action.error;
        break;

      case CHANGE_NICKNAME_REQUEST:
        console.log('reducer - "CHANGE_NICKNAME_REQUEST" activated');
        draft.isChangeNicknameRequest = true;
        draft.isChangeNicknameSuccess = false;
        draft.isChangeNicknameFailure = null;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        console.log('reducer - "CHANGE_NICKNAME_SUCCESS" activated');
        draft.isChangeNicknameRequest = false;
        draft.isChangeNicknameSuccess = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        console.log('reducer - "CHANGE_NICKNAME_FAILURE" activated');
        draft.isChangeNicknameRequest = false;
        draft.isChangeNicknameFailure = action.error;
        break;

      case ADD_POST_TO_ME:
        draft.user.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_OF_ME:
        draft.user.Posts = draft.user.Posts.filter((v) => v.id !== action.data);
        break;
      default:
        break;
    }
  });
};

export default reducer;
