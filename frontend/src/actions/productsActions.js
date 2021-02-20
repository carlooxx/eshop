import axios from "axios";
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
  PRODUCT_CREATE_FAILED,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_REQUEST,
} from "./types";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const res = await axios.get("/api/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};
export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const res = await axios.get(`/api/products/${id}`);
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAIL_FAILED,
      payload: error.response && error.response.data.message,
    });
  }
};
//Delete a product as Admin
export const productDeleteAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
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
    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//Create a product as Admin
export const productCreateAction = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_CREATE_REQUEST,
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
    const { data } = await axios.post("/api/products", {}, config);

    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAILED,
      payload: error.response.data.msg,
    });
  }
};
