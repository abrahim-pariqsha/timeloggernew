import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userLoginReducer } from "./reducer/authreducer";

// Initializing reducers
const reducer = combineReducers({
  // user reducers
  userLoginReducer,
  
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

// initialState
const initialState = {
  userLogin: { user: userInfoFromStorage },
};
// middleware used thunk
const middleware = [thunk];

// store variable initialized
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
