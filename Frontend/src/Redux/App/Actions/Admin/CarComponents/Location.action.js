
import axios from "axios";
import * as types from "../../../Types/Admin/CarComponents.type";
import { BASE_URL } from "../../../../../utils/config";

export const getLocations = (page) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: types.LOCATION_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/location/get-locations?page=${page}`)
        .then((res) => {
            dispatch({ type: types.LOCATION_GET_SUCCESS, payload: res?.data });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.LOCATION_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getAllLocationss = (setData) => (dispatch) => {

    dispatch({ type: types.LOCATION_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/location/get-all-location`)
        .then((res) => {
            dispatch({ type: types.LOCATION_GET_SUCCESS, payload: res?.data });
            let locations = res.data.locations
            locations = locations.map((el) => {
                el.label = el.name
                el.value = el._id
                return el
            })
            setData && setData(locations)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.LOCATION_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getLocationByID = (id, toast, navigate) => (dispatch) => {
    if (!id) return dispatch({
        type: types.LOCATION_GET_BY_ID_ERROR,
    });
    dispatch({ type: types.LOCATION_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/admin/location/get-location/${id}`)
        .then((res) => {
            dispatch({ type: types.LOCATION_GET_BY_ID_SUCCESS, payload: res?.data?.Location });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.LOCATION_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Find location By Provided ID!",
                status: "error",
                position: "top",
                duration: 4000,
            });
        });
};

export const UpdateLocationByID = (id, data, toast, navigate, token) => (dispatch) => {

    dispatch({ type: types.LOCATION_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/admin/location/update-location/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.LOCATION_UPDATE_SUCCESS });
            toast({
                title: `Set Location Status to ${data.status.toUpperCase()}`,
                status: "success",
                position: "top",
                duration: 4000,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.LOCATION_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};


export const DeleteLocationByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.LOCATION_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/admin/location/delete-location/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.LOCATION_DELETE_SUCCESS });
            toast({
                title: `Deleted The Location Successfully`,
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.LOCATION_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};


export const postLocation = (data, navigate, toast, getData, token) => (dispatch) => {
    dispatch({ type: types.LOCATION_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/admin/location/add-location`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.LOCATION_POST_SUCCESS });
            toast({
                title: "Location Added Successfull!",
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
                type: types.LOCATION_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};