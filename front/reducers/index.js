import { HYDRATE } from "next-redux-wrapper";

import user from "./user";
import post from "./post";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  index: (state = {}, action) => {
    switch (action.type) {
      case "HYDRATE":
        console.log("HYDRATE", action);
        return {
          ...state,
          ...action.payload,
        };
      default:
        return state;
    }
  },
  user, // user의 initialState는 combineReducers가 알아서 같이 넣어줌 (user의 initState + user의 reducer)
  post, // post의 initialState는 combineReducers가 알아서 같이 넣어줌 (post의 initState + post의 reducer)
});

export default rootReducer; // configureStore에서 reducer로 쓰임
