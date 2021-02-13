import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/cartReducer.js";
import {
  productReducers,
  productDetailReducers,
} from "./reducers/productReducers.js";
const cartItemsfromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initState = {
  cart: { cartItems: cartItemsfromStorage },
};
const reducer = combineReducers({
  productList: productReducers,
  productDetail: productDetailReducers,
  cart: cartReducer,
});
const middleware = [thunk];

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
