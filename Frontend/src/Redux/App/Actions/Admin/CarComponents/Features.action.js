import axios from 'axios';
import * as types from '../../../Types/Admin/CarComponents.type';
import { BASE_URL } from '../../../../../utils/config';

export const getFeaturess = page => dispatch => {
  if (!page) page = 1;
  dispatch({ type: types.FEATURES_GET_LOADING });
  axios
    .get(`${BASE_URL}/api/admin/features/get-all-features?page=${page}`)
    .then(res => {
      dispatch({ type: types.FEATURES_GET_SUCCESS, payload: res?.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.FEATURES_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};

export const getFeaturesByID = (id, toast, navigate) => dispatch => {
  if (!id)
    return dispatch({
      type: types.FEATURES_GET_BY_ID_ERROR
    });
  dispatch({ type: types.FEATURES_GET_BY_ID_LOADING });
  axios
    .get(`${BASE_URL}/api/admin/features/get-features/${id}`)
    .then(res => {
      dispatch({ type: types.FEATURES_GET_BY_ID_SUCCESS, payload: res?.data?.Features });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.FEATURES_GET_BY_ID_ERROR,
        payload: err?.response?.data?.message
      });
      toast({
        title: 'Cannot Find Features By Provided ID!',
        status: 'error',
        position: 'top',
        duration: 4000
      });
    });
};

export const UpdateFeaturesByID = (id, data, toast, navigate, token) => dispatch => {
  dispatch({ type: types.FEATURES_UPDATE_LOADING });
  axios
    .patch(`${BASE_URL}/api/admin/features/update-features/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.FEATURES_UPDATE_SUCCESS });
      toast({
        title: `Set Features Status to ${data.status.toUpperCase()}`,
        status: 'success',
        position: 'top',
        duration: 4000
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.FEATURES_UPDATE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};

export const DeleteFeaturesByID = (id, toast, getData, token) => dispatch => {
  dispatch({ type: types.FEATURES_DELETE_LOADING });
  axios
    .delete(`${BASE_URL}/api/admin/features/delete-features/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.FEATURES_DELETE_SUCCESS });
      toast({
        title: `Deleted The Features Successfully`,
        status: 'success',
        position: 'top',
        duration: 4000
      });
      getData();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.FEATURES_DELETE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};

export const postFeatures = (data, navigate, toast, getData, token) => dispatch => {
  dispatch({ type: types.FEATURES_POST_LOADING });
  axios
    .post(`${BASE_URL}/api/admin/features/add-features`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.FEATURES_POST_SUCCESS });
      toast({
        title: 'Features Added Successfull!',
        status: 'success',
        position: 'top',
        duration: 4000
      });
      getData();
    })
    .catch(err => {
      console.log(err);
      toast({
        title: err?.response?.data?.message || 'Something Went wrong',
        status: 'error',
        position: 'top',
        duration: 4000
      });
      dispatch({
        type: types.FEATURES_POST_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
