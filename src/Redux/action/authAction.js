import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
} from "../constantsActions";
import axios from "axios"

// Login Action
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });
  
      // send token info with the request
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
  
      // save 'data' variable for data coming from backend
      const { data } = await axios.post(
        "http://timelogger.webstagdummy.com/timelogger/auth/authenticate",
        // set username to email and password to password
        { username: email, password: password },
        config
        );
        console.log("data",data);
  
      // if success
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });
  
      // localStorage set item
      localStorage.setItem("user", JSON.stringify(data));
    //   localStorage.setItem("token", data.token);
    } catch (error) {
      if (error?.response?.data) {
        // error handling
        dispatch({
          type: USER_LOGIN_FAIL,
          // payload: error?.response?.data || (error.response && error.response.data.detail ? error.response.data.detail : error.message),
          payload:
            error.response && error.response.data
              ? error.response.data
              : error.response.data,
        });
      }
    }
  };
  