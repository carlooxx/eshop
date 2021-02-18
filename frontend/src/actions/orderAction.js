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
} from "./types";
import axios from "axios";
export const createOrderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_REQUEST,
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
    const { data } = await axios.post("/api/orders", order, config);
    dispatch({
      type: ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_FAILED,
      payload: error.response.data.msg,
    });
  }
};

//Get ORDER DETAILS ACTION
export const getOrderDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
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
    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAILED,
      payload: error.response.data.msg,
    });
  }
};
//Update state with isPaid: true
export const payOrderAction = (id, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
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
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAILED,
      payload: error.response.data.msg,
    });
  }
};
