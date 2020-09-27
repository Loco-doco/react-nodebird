import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LOG_OUT_REQUEST, LOG_OUT_SUCCESS, LOG_OUT_FAILURE,
    SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE
    } from './actions'

export const initialState = {
    isLoginRequest : false,
    isLoginSuccess : false,
    isLoginFailure : null,
    isLogoutRequest : false,
    isLogoutSuccess : false,
    isLogoutFailure : null,
    isSignUpRequest : false,
    isSignUpSuccess : false,
    isSignUpFailure : null,
    user : null,
    signUpData : {},
    loginData : {},
};

const dummyUser = (data) => ({
    ...data,
    nickname: 'kenny',
    id: 1,
    Posts : [],
    Followings : [],
    Followers : []
})

export const loginRequestAction = (data) => {
    console.log('reducer - "loginRequestAction" is activated and data is ', data)
    return {
        type : LOG_IN_REQUEST,
        data
    }
};

export const logoutRequestAction = (data) => {
    console.log('reducer - "logoutRequestAction" is activated')
    return {
        type : LOG_OUT_REQUEST,
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type){
        case LOG_IN_REQUEST : 
            console.log(`reducer - ${LOG_IN_REQUEST} activated and I got action like ${action}`)
            return {
                ...state,
                isLoginRequest : true,
                isLoginSuccess : false,
                isLoginFailure : null
            };
        case LOG_IN_SUCCESS : 
            console.log('reducer - "LOG_IN_SUCCESS" activated')
            return {
                ...state,
                isLoginRequest : false,
                isLoginSuccess : true,
                user : dummyUser(action.data)
            };
        case LOG_IN_FAILURE : 
            console.log('reducer - "LOG_IN_FAILURE" activated')
            return {
                ...state,
                isLoginRequest : false,
                isLoginFailure : action.error
            };
        case LOG_OUT_REQUEST : 
            console.log('reducer - "LOG_OUT_REQUEST" activated')
            return {
                ...state,
                isLogoutRequest : true,
                isLogoutSuccess : false,
                isLogoutFailure : null
            };
        case LOG_OUT_SUCCESS : 
        console.log('reducer - "LOG_OUT_SUCCESS" activated')
            return {
                ...state,
                isLogoutRequest : false,
                isLogoutSuccess : true,
                user : null
            };
        case LOG_OUT_FAILURE : 
            console.log('reducer - "LOG_OUT_FAILURE" activated')
            return {
                ...state,
                isLogoutRequest : false,
                isLogoutFailure : action.error
            };
        case SIGNUP_REQUEST : 
            console.log('reducer - "SIGNUP_REQUEST" activated')
            return {
                ...state,
                isSignUpRequest : true,
                isSignUpSuccess : false,
                isSignUpFailure : null
            };
        case SIGNUP_SUCCESS : 
            console.log('reducer - "SIGNUP_SUCCESS" activated')
            return {
                ...state,
                isSignUpRequest : false,
                isSignUpSuccess : true
            };
        case SIGNUP_FAILURE : 
            console.log('reducer - "SIGNUP_FAILURE" activated')
            return {
                ...state,
                isSignUpRequest : false,
                isSignUpFailure : action.error
            };
        default:
            return state;
    }
}

export default reducer;