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
  PRODUCT_UPDATE_EDIT_RESET,
  PRODUCT_UPDATE_EDIT_FAILED,
  PRODUCT_UPDATE_EDIT_SUCCESS,
  PRODUCT_UPDATE_EDIT_REQUEST,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAILED,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
  PRODUCT_TOP_FAILED,
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
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
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

//Product update edit as Admin
export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_EDIT_REQUEST:
      return { isLoading: true };
    case PRODUCT_UPDATE_EDIT_SUCCESS:
      return {
        isLoading: false,
        success: true,
        product: action.payload,
      };
    case PRODUCT_UPDATE_EDIT_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_UPDATE_EDIT_RESET:
      return { product: {} };
    default:
      return { ...state };
  }
};
//Product create review
export const productCreateReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case PRODUCT_CREATE_REVIEW_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return { ...state };
  }
};
//Top rated product
export const topRatedProductReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return {
        isLoading: true,
        products: [],
      };
    case PRODUCT_TOP_SUCCESS:
      return {
        isLoading: false,
        products: action.payload,
      };
    case PRODUCT_TOP_FAILED:
      return {
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
