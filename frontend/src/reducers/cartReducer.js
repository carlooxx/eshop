import { CART_ADD_ITEMS, CART_REMOVE_ITEMS } from "../actions/types";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEMS:
      const item = action.payload;

      const existItems = state.cartItems.find(
        (x) => x.product === item.product
      );

      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItems.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEMS:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    default:
      return { ...state };
  }
};
