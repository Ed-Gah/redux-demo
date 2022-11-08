/////////////////////////////////////////
// Working with multiple Reducers
/////////////////////////////////////////
// Using middleware logger in redux (redux-logger)

// set up stor
const redux = require("redux");
const createStore = redux.createStore;

// creating a redux middleware
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// actions bind creators
const actionsBindCreators = redux.bindActionCreators;
// combine reducers
const combineReducers = redux.combineReducers;
// apply middleware
const applyMiddleware = redux.applyMiddleware;

// Type
// Cake types
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";

// icecream types
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// actions creators
// cake action creators
function orderCake(qty = 1) {
  return {
    type: CAKE_ORDERED,
    payload: qty,
  };
}
function restockCake(qty = 1) {
  return { type: CAKE_RESTOCKED, payload: qty };
}

// icecream actions creators
function orderIceCreams(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}
function restockIceCreams(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}

// Inital states
// Cake inital state
const initialCakeState = {
  numOfCakes: 10,
};

// icecream initial state
const initialIceCreams = {
  numOfIceCreams: 20,
};

// Reducers
// Cake reducer

const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - action.payload,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

// Icecream reducer
const iceCreamReducer = (state = initialIceCreams, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    default:
      return state;
  }
};

// combine reducers
const rootReducers = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
// hold the app state with store
const store = createStore(rootReducers, applyMiddleware(logger));

console.log("Initial state", store.getState());

// alert app to subscribes to changes in store
const unsubscribe = store.subscribe(() => {});

// dispatch actions
const actions = actionsBindCreators(
  { orderCake, restockCake, orderIceCreams, restockIceCreams },
  store.dispatch
);
actions.orderCake(3);
actions.restockCake(5);
actions.orderIceCreams(3);
actions.restockIceCreams(5);
unsubscribe();
