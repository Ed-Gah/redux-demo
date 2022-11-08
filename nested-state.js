// updating nested states with immer
// redux logger
// refer to redux logger documentation
const redux = require("redux");
const produce = require("immer").produce;

// initial state
const initialState = {
  name: "Edwin",
  address: {
    street: "123 Main Street",
    city: "Buea",
    state: "NW",
  },
};
// action type
const STREET_UPDATED = "STREET_UPDATED";

// action creator
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

// street reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    //   return {
    //     ...state,
    //     address: {
    //       ...state.address,
    //       street: action.payload,
    //     },
    //   };
    default:
      return state;
  }
};

// create store
const store = redux.createStore(reducer);
console.log("Inital state of store:", store.getState());
// dispatch actions
const unsubscribe = store.subscribe(() =>
  console.log("Updated state of store:", store.getState())
);
// dispatch
store.dispatch(updateStreet("342 Malingo street"));
unsubscribe();
