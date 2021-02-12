import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAILED,
  PRODUCT_DETAIL_FAILED,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
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
