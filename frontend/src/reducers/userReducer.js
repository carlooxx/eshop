import {
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from "../actions/types";

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
