import axios from "axios";
import * as types from "../../Types/Admin/Report.type";
import { BASE_URL } from "../../../../utils/config";


export const getTransactionReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-transaction-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.transactions)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getCarReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-car-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.carsreport)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTestDriveReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-testdrive-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.testDrives)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getBookingReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-booking-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.bookings)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getCustomerReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-customer-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.customers)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getVendorReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-vendor-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.vendors)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getEmployeeReport = (params, setData, token) => (dispatch) => {
    dispatch({ type: types.REPORT_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/report/get-employee-report`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.REPORT_GET_SUCCESS });
            setData(res?.data?.employees)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.REPORT_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};