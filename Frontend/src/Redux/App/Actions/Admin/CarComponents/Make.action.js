
import axios from "axios";
import * as types from "../../../Types/Admin/CarComponents.type";
import { BASE_URL } from "../../../../../utils/config";

export const getMakes = (page) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: types.MAKE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/make/get-all-make?page=${page}`)
        .then((res) => {
            dispatch({ type: types.MAKE_GET_SUCCESS, payload: res?.data });

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.MAKE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getMakeByID = (id, toast, navigate) => (dispatch) => {
    if (!id) return dispatch({
        type: types.MAKE_GET_BY_ID_ERROR,
    });
    dispatch({ type: types.MAKE_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/make/get-make/${id}`)
        .then((res) => {
            dispatch({ type: types.MAKE_GET_BY_ID_SUCCESS, payload: res?.data?.Make });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.MAKE_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Find Body Type By Provided ID!",
                status: "error",
                position: "top",
                duration: 4000,
            });
        });
};

export const UpdateMakeByID = (id, data, toast, navigate, token) => (dispatch) => {

    dispatch({ type: types.MAKE_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/admin/make/update-make/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.MAKE_UPDATE_SUCCESS });
            toast({
                title: `Set Body Type Status to ${data.status.toUpperCase()}`,
                status: "success",
                position: "top",
                duration: 4000,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.MAKE_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};


export const DeleteMakeByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.MAKE_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/admin/make/delete-make/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.MAKE_DELETE_SUCCESS });
            toast({
                title: `Deleted The Body Type Successfully`,
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.MAKE_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};


export const postMake = (data, navigate, toast, getData, token) => (dispatch) => {
    dispatch({ type: types.MAKE_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/admin/make/add-make`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.MAKE_POST_SUCCESS });
            toast({
                title: "Body Type Added Successfull!",
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
                type: types.MAKE_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};