
import axios from "axios";
import * as types from "../../../Types/Admin/CarComponents.type";
import { BASE_URL } from "../../../../../utils/config";

export const getColors = (page) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: types.COLOR_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/color/get-all-color?page=${page}`)
        .then((res) => {
            dispatch({ type: types.COLOR_GET_SUCCESS, payload: res?.data });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.COLOR_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getColorByID = (id, toast, navigate) => (dispatch) => {
    if (!id) return dispatch({
        type: types.COLOR_GET_BY_ID_ERROR,
    });
    dispatch({ type: types.COLOR_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/color/get-color/${id}`)
        .then((res) => {
            dispatch({ type: types.COLOR_GET_BY_ID_SUCCESS, payload: res?.data?.Color });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.COLOR_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Find Color By Provided ID!",
                status: "error",
                position: "top",
                duration: 4000,
            });
        });
};

export const UpdateColorByID = (id, data, toast, navigate, token) => (dispatch) => {

    dispatch({ type: types.COLOR_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/admin/color/update-color/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.COLOR_UPDATE_SUCCESS });
            toast({
                title: `Set Color Status to ${data.status.toUpperCase()}`,
                status: "success",
                position: "top",
                duration: 4000,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.COLOR_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};


export const DeleteColorByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.COLOR_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/admin/color/delete-color/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.COLOR_DELETE_SUCCESS });
            toast({
                title: `Deleted The Color Successfully`,
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.COLOR_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};


export const postColor = (data, navigate, toast, getData, token) => (dispatch) => {
    dispatch({ type: types.COLOR_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/admin/color/add-color`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.COLOR_POST_SUCCESS });
            toast({
                title: "Color Added Successfull!",
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
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
                type: types.COLOR_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};