import {
  ORDER_FAILED,
  ORDER_SUCCESS,
  ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
} from "../actions/types";

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
//Get ORDER DETAILS
export const orderDetailsReducers = (
  state = { isLoading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        isLoading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return { state };
  }
};
