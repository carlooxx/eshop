import axios from "axios";
import {
  ORDER_LIST_PROFILE_RESET,
  USER_DELETE_FAILED,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAILED,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAILED,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAILED,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_DETAILS_FAILED,
  USER_PROFILE_DETAILS_REQUEST,
  USER_PROFILE_DETAILS_SUCCESS,
  USER_PROFILE_UPDATE_FAILED,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_REGISTER_FAILED,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_EDIT_UPDATE_REQUEST,
  USER_EDIT_UPDATE_SUCCESS,
  USER_EDIT_UPDATE_FAILED,
} from "./types";
//User Login
export const userLoginAction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const { data } = await axios.post("/api/user/login", { email, password });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILED,
      payload: error.response.data.msg,
    });
  }
};
export const userLogoutAction = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: ORDER_LIST_PROFILE_RESET });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: USER_LIST_RESET });
};
//User Register
export const userRegisterAction = (name, email, password) => async (
  dispatch
) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });
    const { data } = await axios.post("/api/user/register", {
      name,
      email,
      password,
    });
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//User DETAILS
export const userDetailsAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    //Getting TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //Passing TOKEN
    const config = {
      headers: {
        "auth-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/user/profile", config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//User PROFILE UPDATE
export const userUpdateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_UPDATE_REQUEST,
    });

    //Getting TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //Passing TOKEN
    const config = {
      headers: {
        "auth-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/user/profile`, user, config);

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_UPDATE_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//User PROFILE LIST from ADMIN panel
export const userListProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    //Getting TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //Passing TOKEN
    const config = {
      headers: {
        "auth-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.get("/api/user/users", config);

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//Delete a user as Admin
export const userDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    });

    //Getting TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //Passing TOKEN
    const config = {
      headers: {
        "auth-token": `${userInfo.token}`,
      },
    };
    await axios.delete(`/api/user/users/${id}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//User DETAILS (Admin)
export const userProfileDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_PROFILE_DETAILS_REQUEST,
    });

    //Getting TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //Passing TOKEN
    const config = {
      headers: {
        "auth-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/user/users/${id}`, config);

    dispatch({
      type: USER_PROFILE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_PROFILE_DETAILS_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//User DETAILS UPDATE (Admin)
export const userEditUpdateAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_EDIT_UPDATE_REQUEST,
    });

    //Getting TOKEN
    const {
      userLogin: { userInfo },
    } = getState();

    //Passing TOKEN
    const config = {
      headers: {
        "auth-token": `${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/user/users/${user._id}`,
      user,
      config
    );

    dispatch({ type: USER_EDIT_UPDATE_SUCCESS });
    dispatch({ type: USER_PROFILE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_EDIT_UPDATE_FAILED,
      payload: error.response.data.msg,
    });
  }
};
