import axios from "axios";
import * as types from "../Types/Vendor.type";
import { BASE_URL } from "../../../utils/config";

export const getVendors = (params, setData, token) => (dispatch) => {

  dispatch({ type: types.VENDOR_GET_LOADING });
  axios
    .get(`${BASE_URL}/api/vendor/get-all-vendors`, {
      params,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      dispatch({ type: types.VENDOR_GET_SUCCESS, payload: res?.data });
      setData && setData(res?.data?.Vendors);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.VENDOR_GET_ERROR,
        payload: err?.response?.data?.message,
      });
    });
};
export const getVendorNames = (setData, token) => (dispatch) => {

  dispatch({ type: types.VENDOR_GET_LOADING });
  axios
    .get(`${BASE_URL}/api/vendor/get-all-vendor-names`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      dispatch({ type: types.VENDOR_GET_SUCCESS, payload: res?.data });
      setData && setData(res?.data?.Vendors);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.VENDOR_GET_ERROR,
        payload: err?.response?.data?.message,
      });
    });
};
export const getVendorByID = (id, setData, toast, navigate, token) => (dispatch) => {
  if (!id)
    return dispatch({
      type: types.VENDOR_GET_BY_ID_ERROR,
    });
  dispatch({ type: types.VENDOR_GET_BY_ID_LOADING });
  axios
    .get(`${BASE_URL}/api/vendor/get-vendor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      dispatch({
        type: types.VENDOR_GET_BY_ID_SUCCESS,
        payload: res?.data?.Vendor,
      });

      setData(res?.data?.Vendor);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.VENDOR_GET_BY_ID_ERROR,
        payload: err?.response?.data?.message,
      });
      toast({
        title: "Cannot Find Vendor By Provided ID!",
        status: "error",
        position: "top",
        duration: 4000,
      });
      navigate("/admin/vendor");
    });
};
export const UpdateVendorByID = (id, data, toast, navigate, navigateTo, getData, title, token) => (dispatch) => {
  dispatch({ type: types.VENDOR_UPDATE_LOADING });
  axios
    .patch(`${BASE_URL}/api/vendor/update/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      dispatch({ type: types.VENDOR_UPDATE_SUCCESS });
      toast({
        title: title || "Updated Successfully",
        status: "success",
        position: "top",
        duration: 4000,
      });
      getData();

      if (navigateTo == "/vendor/dashboard") {
        localStorage.setItem(
          "vendor_detail_carvendor",
          JSON.stringify(res?.data?.UpdatedVendor)
        );
      }
      navigate(navigateTo);
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.VENDOR_UPDATE_ERROR,
        payload: err?.response?.data?.message,
      });
    });
};
export const DeleteVendorByID = (id, toast, getData, token) => (dispatch) => {
  dispatch({ type: types.VENDOR_DELETE_LOADING });
  axios
    .delete(`${BASE_URL}/api/vendor/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
    })
    .then((res) => {
      dispatch({ type: types.VENDOR_DELETE_SUCCESS });
      toast({
        title: `Deleted The Vendor Successfully`,
        status: "success",
        position: "top",
        duration: 4000,
      });
      getData();
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: types.VENDOR_DELETE_ERROR,
        payload: err?.response?.data?.message,
      });
    });
};
export const postVendor = (data, navigate, toast) => (dispatch) => {
  dispatch({ type: types.VENDOR_POST_LOADING });
  axios
    .post(`${BASE_URL}/api/vendor/register`, data)
    .then((res) => {
      dispatch({ type: types.VENDOR_POST_SUCCESS });
      toast({
        title: "Vendor Added Successfull!",
        status: "success",
        position: "top",
        duration: 4000,
      });

      ;
      navigate("/admin/vendor");
    })
    .catch((err) => {
      console.log(err);
      toast({
        title: "Signup Failed!",
        description: err?.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 4000,
        isClosable: true,
      });

      dispatch({
        type: types.VENDOR_POST_ERROR,
        payload: err?.response?.data?.message,
      });
    });
};
