import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_RESET,
  USER_LIST_FAILED,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAILED,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_DETAILS_FAILED,
  USER_PROFILE_DETAILS_RESET,
  USER_PROFILE_DETAILS_REQUEST,
  USER_EDIT_UPDATE_REQUEST,
  USER_EDIT_UPDATE_SUCCESS,
  USER_EDIT_UPDATE_FAILED,
  USER_EDIT_UPDATE_RESET,
} from "../actions/types";
//User LOGIN reducer
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { isLoading: true };
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case USER_LOGIN_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return { ...state };
  }
};
//User REGISTER Reducer
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { isLoading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case USER_REGISTER_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LOGOUT:
      return {};
    default:
      return { ...state };
  }
};
//User DETAILS reducer
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case USER_DETAILS_SUCCESS:
      return {
        user: action.payload,
        isLoading: false,
      };
    case USER_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_DETAILS_RESET:
      return {
        user: {},
      };
    default:
      return { ...state };
  }
};
//User UPDATE reducer
export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { ...state, isLoading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
        success: true,
      };
    case USER_PROFILE_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
//List of user profile at Admin panel
export const userListProfileReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { isLoading: true };
    case USER_LIST_SUCCESS:
      return {
        users: action.payload,
        isLoading: false,
        success: true,
      };
    case USER_LIST_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_LIST_RESET:
      return { users: [] };
    default:
      return { ...state };
  }
};
//Delete a user as Admin
export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { isLoading: true };
    case USER_DELETE_SUCCESS:
      return {
        isLoading: false,
        success: true,
      };
    case USER_DELETE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return { ...state };
  }
};
//User DETAILS reducer
export const userDetailsProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_DETAILS_REQUEST:
      return { ...state, isLoading: true };
    case USER_PROFILE_DETAILS_SUCCESS:
      return {
        user: action.payload,
        isLoading: false,
      };
    case USER_PROFILE_DETAILS_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_PROFILE_DETAILS_RESET:
      return {
        user: {},
      };
    default:
      return { ...state };
  }
};
//User DETAILS reducer UPDATE
export const userEditDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_UPDATE_REQUEST:
      return { isLoading: true };
    case USER_EDIT_UPDATE_SUCCESS:
      return {
        userInfo: action.payload,
        isLoading: false,
        success: true,
      };
    case USER_EDIT_UPDATE_FAILED:
      return {
        loading: false,
        error: action.payload,
      };
    case USER_EDIT_UPDATE_RESET:
      return {
        user: {},
      };
    default:
      return { ...state };
  }
};
