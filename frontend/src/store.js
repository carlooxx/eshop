import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  cartReducer,
  getShippingAddressReducer,
} from "./reducers/cartReducer.js";
import {
  getOrdersProfileReducers,
  orderDetailsReducers,
  orderPayReducers,
  orderReducers,
} from "./reducers/orderReducers.js";
import {
  productReducers,
  productDetailReducers,
} from "./reducers/productReducers.js";
import {
  userDetailsReducer,
  userListProfileReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./reducers/userReducer";

const cartItemsfromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const addressFromStorage = localStorage.getItem("address")
  ? JSON.parse(localStorage.getItem("address"))
  : {};

const initState = {
  cart: {
    cartItems: cartItemsfromStorage,
    shipAddress: addressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const reducer = combineReducers({
  productList: productReducers,
  productDetail: productDetailReducers,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userUpdateProfileReducer,
  userProfileList: userListProfileReducer,
  shipAddress: cartReducer,
  orderItems: orderReducers,
  orderDetails: orderDetailsReducers,
  orderPay: orderPayReducers,
  orderProfileList: getOrdersProfileReducers,
});
const middleware = [thunk];

const store = createStore(
  reducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
