import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productReducers,
  productDetailReducers,
} from "./reducers/productReducers.js";

const initState = {};
const reducer = combineReducers({
  productList: productReducers,
  productDetail: productDetailReducers,
});
const middleware = [thunk];

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
