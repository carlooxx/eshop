import {
  CART_ADD_ITEMS,
  CART_REMOVE_ITEMS,
  CART_SHIPPING_ADDRESS,
} from "../actions/types";

export const cartReducer = (
  state = { cartItems: [], shipAddress: {} },
  action
) => {
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
    case CART_SHIPPING_ADDRESS:
      return {
        ...state,
        shipAddress: action.payload,
      };
    default:
      return { ...state };
  }
};
