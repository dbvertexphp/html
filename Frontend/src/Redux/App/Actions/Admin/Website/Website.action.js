
import axios from "axios";
import * as WebsiteTypes from "../../../Types/Website.types";
import { BASE_URL } from "../../../../../utils/config";

export const getDashDetails = (setData, token) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-dashboard-data`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getVendorDashDetails = (id, setData, token) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-vendor-dashboard-data/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getEmployeeDashDetails = (id, setData, token) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-employee-dashboard-data/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getAllVendorsByemployee = (id, page, data, setData, token) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-all-employee-vendor/${id}?page=${page}`,  {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data?.Cars)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};

export const getAllCarsByEmployeeID = (id, page, data, setData , token) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-all-cars-employee/${id}?page=${page}`,  {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });

            setData && setData(res?.data?.cars)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};

export const getAllBookingByEmployeeID = (id, page, data, setData , token) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-all-booking-employee/${id}?page=${page}`,  {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });

            setData && setData(res?.data?.cars)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getAllTestdriveByEmployeeID = (id, page, data, setData , token) => (dispatch) => {
    if (!page) page = 1
    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-all-testdrive-employee/${id}?page=${page}`,  {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(res);
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });

            setData && setData(res?.data?.cars)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getSalesDetails = (setData, token) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-sales-data`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getallBanners = (setBannerData, setImages) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/website/get-all-banners`)
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });

            let banners = []
            for (const ban in res?.data?.banner_images) {
                banners.push(res?.data?.banner_images[ban])
            }
            setImages && setImages(banners)
            setBannerData && setBannerData(res?.data?.banner_images)

        })

        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const getTools = (items, setData) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/website/get-all-data`)
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res?.data });

            setData && setData(res?.data?.Data[items])
        })

        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_GET_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};
export const UpdateWebsiteData = (Data, toast, toastTitle, getData, token) => (dispatch) => {

    dispatch({ type: WebsiteTypes.WEBSITE_UPDATE_LOADING });
    axios
        .post(`${BASE_URL}/api/website/update-website`, Data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: WebsiteTypes.WEBSITE_UPDATE_SUCCESS, payload: res?.data });
            toast({
                title: toastTitle || "Updated Successfully.",
                status: "success",
                duration: 4000,
                isClosable: true,
                position: "top"
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: WebsiteTypes.WEBSITE_UPDATE_SUCCESS,
                payload: err?.response?.data?.message,
            });
        });
};

export const getCarByID = (id, toast, setData,) => (dispatch) => {
    if (!id) return
    dispatch({ type: WebsiteTypes.WEBSITE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/test/get-car/${id}`)
        .then((res) => {
            let car = res?.data?.Car

            dispatch({ type:WebsiteTypes.WEBSITE_GET_SUCCESS, payload: res.data });
            setData && setData(car)

        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.CAR_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });

        });
};

