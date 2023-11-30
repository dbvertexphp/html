
import axios from "axios";
import * as types from "../../../Types/Admin/CarComponents.type";
import { BASE_URL } from "../../../../../utils/config";

export const getBodyTypes = (page) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: types.BODYTYPE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/bodytype/get-all-bodytype?page=${page}`)
        .then((res) => {
            dispatch({ type: types.BODYTYPE_GET_SUCCESS, payload: res?.data });

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.BODYTYPE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const UpdateBodyTypeByID = (id, data, toast, navigate, token) => (dispatch) => {

    dispatch({ type: types.BODYTYPE_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/admin/bodytype/update-bodytype/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.BODYTYPE_UPDATE_SUCCESS });
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
                type: types.BODYTYPE_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const DeleteBodyTypeByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.BODYTYPE_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/admin/bodytype/delete-bodytype/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.BODYTYPE_DELETE_SUCCESS });
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
                type: types.BODYTYPE_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const postBodyType = (data, navigate, toast, getData, token) => (dispatch) => {
    dispatch({ type: types.BODYTYPE_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/admin/bodytype/add-bodytype`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.BODYTYPE_POST_SUCCESS });
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
                type: types.BODYTYPE_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};