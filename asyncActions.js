const redux = require("redux");
// when using asynchronous redux use axois and redux thunk
const applyMiddleware = redux.applyMiddleware;
// apply thunk middleware function
const thunkMiddleware = require("redux-thunk").default;
const reduxLogger = require("redux-logger");
const axios = require("axios");
// redux logger middleware
const logger = reduxLogger.createLogger();

// Initial state

const initialState = {
  loading: false,
  users: [],
  errors: "",
};

// actions types
const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
const FETCH_USER_SUCCEEDED = "FETCH_USER_SUCCEEDED";
const FETCH_USER_FAILED = "FETCH_USER_FAILED";

// actions creators functions

const fetchUsersRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USER_SUCCEEDED,
    payload: users,
  };
};

const fetchUsersFailed = (error) => {
  return {
    type: FETCH_USER_FAILED,
    payload: error,
  };
};

// reducer function

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USER_SUCCEEDED:
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};
// async action creators
const fetchUsers = () => {
  return function (dispatch) {
    // setting loading to true
    dispatch(fetchUsersRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/usersddd")
      .then((response) => {
        const users = response?.data?.map((user) => user.id);
        // when we get the response
        dispatch(fetchUsersSuccess(users));
      })
      .catch((err) => {
        // err.message
        dispatch(fetchUsersFailed(err.message));
      });
  };
};
// create redux store
const store = redux.createStore(
  reducer,
  applyMiddleware(thunkMiddleware),
//   applyMiddleware(logger)
);
// subscribe to store
store.subscribe(() => console.log("Store state", store.getState()));

// dispatch async users
store.dispatch(fetchUsers());
