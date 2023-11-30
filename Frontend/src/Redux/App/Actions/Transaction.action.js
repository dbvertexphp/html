
import axios from "axios";
import * as types from "../Types/Transaction.type";
import { BASE_URL } from "../../../utils/config";

export const getTransactions = (params, token) => (dispatch) => {

    dispatch({ type: types.TRANSACTION_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/transaction/get-all-transactions`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.TRANSACTION_GET_SUCCESS, payload: res?.data });

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TRANSACTION_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTransactionsByUserID = (id, setData, token) => (dispatch) => {
    dispatch({ type: types.TRANSACTION_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/transaction/get-transactions-by-userid/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.TRANSACTION_GET_SUCCESS, payload: res?.data?.transactions });
            setData && setData(res?.data?.transactions)


        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TRANSACTION_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTransactionsByVendorID = (id, setData, token) => (dispatch) => {
    dispatch({ type: types.TRANSACTION_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/transaction/get-transactions-by-vendorid/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.TRANSACTION_GET_SUCCESS, payload: res?.data?.transactions });
            setData && setData(res?.data?.transactions)


        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TRANSACTION_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

