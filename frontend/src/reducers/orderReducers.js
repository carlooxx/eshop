import { ORDER_FAILED, ORDER_SUCCESS, ORDER_REQUEST } from "../actions/types";

export const orderReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return {
        isLoading: true,
      };
    case ORDER_SUCCESS:
      return {
        success: true,
        order: action.payload,
        isLoading: false,
      };
    case ORDER_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return { state };
  }
};
