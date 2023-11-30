
import axios from "axios";
import * as types from "../Types/Booking.type";
import { BASE_URL } from "../../../utils/config";

export const getBookings = (params) => (dispatch) => {

    dispatch({ type: types.BOOKING_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/booking/get-all-bookings`, { params })
        .then((res) => {
            dispatch({ type: types.BOOKING_GET_SUCCESS, payload: res?.data });

        })
        .catch((err) => {
            console.log(err);
            alert(err?.response?.data?.message)
            dispatch({
                type: types.BOOKING_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getBookingsByUserId = (id, token) => (dispatch) => {

    dispatch({ type: types.BOOKING_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/booking/get-bookings-by-userid/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.BOOKING_GET_SUCCESS, payload: res?.data });

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.BOOKING_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getBookingsByVendorId = (id, params, token) => (dispatch) => {

    dispatch({ type: types.BOOKING_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/booking/get-bookings-by-vendorid/${id}`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.BOOKING_GET_SUCCESS, payload: res?.data });

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.BOOKING_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getBookingsByCarId = (id, setData, token) => (dispatch) => {

    dispatch({ type: types.BOOKING_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/booking/get-bookings-by-carid/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.BOOKING_GET_SUCCESS, payload: res?.data });
            setData && setData(res.data.bookings)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.BOOKING_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const createNewBooking = (data, toast, success, token) => (dispatch) => {
    dispatch({ type: types.BOOKING_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/booking/book-a-car`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.BOOKING_POST_SUCCESS });
            if (res?.data?.success) {
                success()
                window.location.href = (res.data.url)
            }
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: err?.response?.data?.message || "Something Went wrong",
                status: "error",
                position: "top",
                duration: 4000,
            });
            dispatch({
                type: types.BOOKING_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const UpdatebookingByID = (id, data, toast, getData, ClosingFn, title, token) => (dispatch) => {

    dispatch({ type: types.BOOKING_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/booking/update/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.BOOKING_UPDATE_SUCCESS });
            toast({
                title: "Booking Updated Successfully",
                status: "success",
                position: "top",
                duration: 4000,
            });

            getData && getData()
            ClosingFn && ClosingFn()
            res?.data?.url ? window.location.href = res.data.url : ""

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.BOOKING_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: err?.response?.data?.message || "Cannot Update Test Drive",
                status: "error",
                position: "top",
                duration: 4000,
            });
        });
};
