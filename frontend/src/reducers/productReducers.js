import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAILED,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
} from "../actions/types";

export const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return {
        isLoading: true,
        products: [],
      };
    case PRODUCT_LIST_SUCCESS:
      return {
        isLoading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const productDetailReducers = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return {
        isLoading: true,
        product: {},
      };
    case PRODUCT_DETAIL_SUCCESS:
      return {
        isLoading: false,
        product: action.payload,
      };
    case PRODUCT_DETAIL_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
//Delete a product as Admin
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { isLoading: true };
    case PRODUCT_DELETE_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case PRODUCT_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
//Create a product as Admin
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { isLoading: true };
    case PRODUCT_CREATE_SUCCESS:
      return {
        isLoading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_CREATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return { ...state };
  }
};
