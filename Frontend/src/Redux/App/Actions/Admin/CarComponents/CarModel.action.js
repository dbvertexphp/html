
import axios from "axios";
import * as types from "../../../Types/Admin/CarComponents.type";
import { BASE_URL } from "../../../../../utils/config";

export const getCarModels = (page) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: types.CARMODEL_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/carmodel/get-all-carmodel?page=${page}`)
        .then((res) => {
            dispatch({ type: types.CARMODEL_GET_SUCCESS, payload: res?.data });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CARMODEL_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getCarModelByID = (id, toast, navigate) => (dispatch) => {
    if (!id) return dispatch({
        type: types.CARMODEL_GET_BY_ID_ERROR,
    });
    dispatch({ type: types.CARMODEL_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/carmodel/get-carmodel/${id}`)
        .then((res) => {
            dispatch({ type: types.CARMODEL_GET_BY_ID_SUCCESS, payload: res?.data?.CarModel });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CARMODEL_GET_BY_ID_ERROR,
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

export const UpdateCarModelByID = (id, data, toast, navigate, token) => (dispatch) => {

    dispatch({ type: types.CARMODEL_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/admin/carmodel/update-carmodel/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.CARMODEL_UPDATE_SUCCESS });
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
                type: types.CARMODEL_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const DeleteCarModelByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.CARMODEL_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/admin/carmodel/delete-carmodel/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.CARMODEL_DELETE_SUCCESS });
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
                type: types.CARMODEL_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const postCarModel = (data, navigate, toast, getData, token) => (dispatch) => {
    dispatch({ type: types.CARMODEL_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/admin/carmodel/add-carmodel`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.CARMODEL_POST_SUCCESS });
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
                type: types.CARMODEL_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};