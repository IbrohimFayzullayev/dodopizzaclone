import { combineReducers } from "redux";
import { reducer } from "redux-form";
import { ADD_CART, GET_PIZZA } from "../actions/type";

const initialState = [];
const cartListReducer = (state = initialState, action) => {
  if (action.type === GET_PIZZA) {
    return state;
  }
  if (action.type === ADD_CART) {
    return [...state, action.payload];
  }
  return state;
};

const allReducers = combineReducers({
  pizzaList: cartListReducer,
  form: reducer,
});

export default allReducers;
