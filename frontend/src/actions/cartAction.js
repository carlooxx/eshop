import {
  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
  CART_SHIPPING_ADDRESS,
} from "../actions/types";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: CART_ADD_ITEMS,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEMS,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
//Save to local shipping address
export const shippingAddressAction = (data) => async (dispatch) => {
  dispatch({
    type: CART_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("address", JSON.stringify(data));
};
