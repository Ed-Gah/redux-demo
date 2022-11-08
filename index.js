// Creating redux store
const redux = require("redux");
const createStore = redux.createStore;
// Redux helper functions
const bindActionCreators = redux.bindActionCreators;

// Type
const CAKE_ORDERED = "CAKE_ORDERED";
const CAKE_DELIVERED = "CAKE_DELIVERED";
const CAKE_RESTOCKED = "CAKE_RESTOCKED";
const ICECREAM_ORDERED = "ICECREAM_ORDERED";
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED";

// an action is an object with a type property
// action function(action creator)
function orderCake() {
  return {
    // action
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function deliverCake() {
  return {
    type: CAKE_DELIVERED,
    payload: 1,
  };
}

function restockCake(qty = 1) {
  return {
    type: CAKE_RESTOCKED,
    payload: qty,
  };
}

// icecream action creators function
function orderIceCream(qty = 1) {
  return {
    type: ICECREAM_ORDERED,
    payload: qty,
  };
}
function restockIceCream(qty = 1) {
  return {
    type: ICECREAM_RESTOCKED,
    payload: qty,
  };
}
// Reducers specify how the app's state changes in response to actions sent to the store
// Functions that accepts action and type as arguments and return next state of the app
// (previousState, action) => newSate

// Apps state has to represented by a single object
const initialState = {
  numOfCakes: 10,
  anotherProperty: 0,
  numOfIceCreams: 20,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    case CAKE_DELIVERED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + 1,
        anotherProperty: state.anotherProperty + 8,
      };
    case CAKE_RESTOCKED:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    case ICECREAM_ORDERED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - action.payload,
      };
    case ICECREAM_RESTOCKED:
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams + action.payload,
      };
    default:
      return state;
  }
};

// Redux store. One store for the entire application.
// Holds application state
// Allows acces to state via getState()
// Allows state to be updated via dispatch(action)
// Registers listeners via subscribe(listener)
// Handles unregistering of listeners via the function retunred by subscribe(listener)

// Holding app state
const store = createStore(reducer);

// get the current state of the app
console.log("Initial state", store.getState());

// Alert app to subscribe to changes in the store
const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});

// Provide dispatch method to update state
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(8));
const actions = bindActionCreators(
  { orderCake, restockCake, orderIceCream, restockIceCream },
  store.dispatch
);
actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(9);
actions.orderIceCream(2);
actions.orderIceCream(3);
actions.restockIceCream(4);
actions.restockIceCream(3);

// unsubscribe from store

unsubscribe();
