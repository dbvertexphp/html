
import axios from "axios";
import * as types from "../Types/Customer.type";
import { BASE_URL } from "../../../utils/config";
import { CUSTOMER_AUTH_UPDATE_SUCCESS } from "../../Auth/Auth.types";

export const getCustomers = (params, setData, token) => (dispatch) => {

    dispatch({ type: types.CUSTOMER_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/customer/get-all-customers`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.CUSTOMER_GET_SUCCESS, payload: res?.data });
            setData(res?.data?.customers)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CUSTOMER_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getCustomersList = (setData, token) => (dispatch) => {

    dispatch({ type: types.CUSTOMER_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/customer/get-all-customers-list`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.CUSTOMER_GET_SUCCESS, payload: res?.data });
            let customers = res?.data?.customers
            customers = customers.map((el) => {
                el.label = el.first_name + " " + el.last_name
                el.value = el._id
                return el
            })
            customers.unshift({ label: "Search By Customer", value: "", _id: "" })
            setData(customers)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CUSTOMER_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getCustomerByID = (id, setData, toast, navigate, token) => (dispatch) => {
    if (!id) return dispatch({ type: types.CUSTOMER_GET_BY_ID_ERROR, });
    else dispatch({ type: types.CUSTOMER_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/customer/get-customer/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.CUSTOMER_GET_BY_ID_SUCCESS, payload: res?.data?.customer });
            setData && setData(res?.data?.customer);

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CUSTOMER_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Find Customer By Provided ID!",
                status: "error",
                position: "top",
                duration: 4000,
            });
            navigate("/admin/Customer")
        });
};
export const UpdateCustomerByID = (id, data, toast, getData, title, token) => (dispatch) => {

    dispatch({ type: types.CUSTOMER_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/customer/update/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.CUSTOMER_UPDATE_SUCCESS });
            dispatch({ type: CUSTOMER_AUTH_UPDATE_SUCCESS, payload: res?.data });
            toast({
                title: title || "Updated Successfully",
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CUSTOMER_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const DeleteCustomerByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.CUSTOMER_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/customer/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.CUSTOMER_DELETE_SUCCESS });
            toast({
                title: `Deleted The Customer Successfully`,
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CUSTOMER_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const UpdateCustomerPassword = (id, data, toast, getData, title, token) => (dispatch) => {

    dispatch({ type: types.CUSTOMER_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/customer/change-pass/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.CUSTOMER_UPDATE_SUCCESS });
            toast({
                title: title || "Updated Successfully",
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CUSTOMER_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};