import {
    USER_LOGIN_FAIL,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
  } from "../constantsActions";
  

  // Login Reducer
export const userLoginReducer = (state = {}, action) => {
    console.log("..type", action.type);
    switch (action.type) {
     
      case USER_LOGIN_REQUEST:
        // request
        return { ...state, loading: true };
  
      case USER_LOGIN_SUCCESS:
        // success
        return {
          ...state,
          loading: false,
          user: { ...state.user, ...action.payload },
        };
  
      case USER_LOGIN_FAIL:
        // fail
        return { ...state, loading: false, error: action.payload };
      
      default:
        return state;
    }
  };
  