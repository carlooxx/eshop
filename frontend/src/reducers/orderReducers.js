import {
  ORDER_FAILED,
  ORDER_SUCCESS,
  ORDER_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAILED,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAILED,
  ORDER_PAY_RESET,
  ORDER_LIST_PROFILE_REQUEST,
  ORDER_LIST_PROFILE_SUCCESS,
  ORDER_LIST_PROFILE_FAILED,
  ORDER_LIST_PROFILE_RESET,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAILED,
  ORDER_LIST_RESET,
  ORDER_DELIVER_RESET,
  ORDER_DELIVER_FAILED,
  ORDER_DELIVER_SUCCESS,
  ORDER_DELIVER_REQUEST,
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

//Get ORDER DETAILS/ set isPaid = true
export const orderPayReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        isLoading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case ORDER_PAY_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return { state };
  }
};
//Set is delivered = true
export const orderDeliverReducers = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        isLoading: true,
      };
    case ORDER_DELIVER_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case ORDER_DELIVER_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    case ORDER_DELIVER_RESET:
      return {};
    default:
      return { state };
  }
};
//Get all ORDERS for profile
export const getOrdersProfileReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_PROFILE_REQUEST:
      return {
        isLoading: true,
      };
    case ORDER_LIST_PROFILE_SUCCESS:
      return {
        isLoading: false,
        orders: action.payload,
      };
    case ORDER_LIST_PROFILE_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    case ORDER_LIST_PROFILE_RESET:
      return {
        orders: [],
      };
    default:
      return { state };
  }
};
//Get all ORDERS as Admin
export const ordersListReducers = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return {
        isLoading: true,
      };
    case ORDER_LIST_SUCCESS:
      return {
        isLoading: false,
        orders: action.payload,
      };
    case ORDER_LIST_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    case ORDER_LIST_RESET:
      return {
        orders: [],
      };
    default:
      return { state };
  }
};
