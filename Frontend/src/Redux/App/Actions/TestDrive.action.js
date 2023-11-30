
import axios from "axios";
import * as types from "../Types/TestDrive.type";
import { BASE_URL } from "../../../utils/config";

export const getTestDrives = (params, setData) => (dispatch) => {

    dispatch({ type: types.TESTDRIVE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test-drive/get-all-testdrives`, { params })
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data?.testDrives)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TESTDRIVE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTestDrivesCarIds = (setData) => (dispatch) => {

    dispatch({ type: types.TESTDRIVE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test-drive/get-all-testdrives-of-car-ids`)
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_GET_SUCCESS, payload: res?.data });
            let temp = res.data.testDrives
            temp = temp.reduce((acc, item) => {
                acc[item.car_id] = acc[item.car_id] + 1 || 1
                return acc
            }, {})
            setData && setData(temp)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TESTDRIVE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTestDrivesByCustomerID = (id, setData, token) => (dispatch) => {
    dispatch({ type: types.TESTDRIVE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test-drive/get-all-testdrives-of-customer/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_GET_SUCCESS, payload: res?.data?.testDrives });
            setData && setData(res?.data?.testDrives)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TESTDRIVE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTestDrivesByVendorID = (id, params, setData, token) => (dispatch) => {
    dispatch({ type: types.TESTDRIVE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test-drive/get-all-testdrives-of-vendorid/${id}`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_GET_SUCCESS, payload: res?.data?.testDrives });
            setData && setData(res?.data?.testDrives)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TESTDRIVE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const getTestDrivesByCarID = (id, setData) => (dispatch) => {
    dispatch({ type: types.TESTDRIVE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test-drive/get-all-testdrives-of-car/${id}`)
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_GET_SUCCESS, payload: res?.data?.testDrives });
            setData && setData(res?.data?.testDrives)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TESTDRIVE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTestDriveByID = (id, setData, toast, navigate) => (dispatch) => {
    if (!id) return dispatch({
        type: types.TESTDRIVE_GET_BY_ID_ERROR,
    });
    // dispatch({ type: types.TESTDRIVE_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/test-drive/get-testdrive/${id}`)
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_GET_BY_ID_SUCCESS, payload: res?.data?.testDrive });

            setData(res?.data?.testDrive)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.TESTDRIVE_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Find Test Drive By Provided ID!",
                status: "error",
                position: "top",
                duration: 4000,
            });
            navigate("/")
        });
};
export const UpdateTestDriveByID = (id, data, toast, getData, title, setAlertMsg1, token) => (dispatch) => {

    dispatch({ type: types.TESTDRIVE_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/test-drive/update/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.TESTDRIVE_UPDATE_SUCCESS });
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
                type: types.TESTDRIVE_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
            setAlertMsg1({
                text: err?.response?.data?.message || "Cannot Update Test Drive",
                open: true
            })
            // toast({
            //     title: err?.response?.data?.message || "Cannot Update Test Drive",
            //     status: "error",
            //     position: "top",
            //     duration: 4000,
            // });
        });
};

export const postTestDrive = (data, setAlertMsg1) => (dispatch) => {

    dispatch({ type: types.TESTDRIVE_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/test-drive/add`, data)
        .then((res) => {
            dispatch({ type: types.TESTDRIVE_POST_SUCCESS });
            if (res?.data?.success) {
                window.location.href = (res.data.url)
            }

        })
        .catch((err) => {
            setAlertMsg1({
                text: err.response.data.message || "Something Went wrong",
                open: true
            })
            dispatch({
                type: types.TESTDRIVE_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};