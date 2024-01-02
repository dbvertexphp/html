import axios from 'axios';
import * as types from '../../../Types/Admin/CarComponents.type';
import { BASE_URL } from '../../../../../utils/config';

export const getCarName = page => dispatch => {
  if (!page) page = 1;
  dispatch({ type: types.CARNAME_GET_LOADING });
  axios
    .get(`${BASE_URL}/api/admin/carname/get-carname?page=${page}`)
    .then(res => {
      dispatch({ type: types.CARNAME_GET_SUCCESS, payload: res?.data });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CARNAME_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getAllCarNamess = setData => dispatch => {
  dispatch({ type: types.CARNAME_GET_LOADING });
  axios
    .get(`${BASE_URL}/api/admin/carname/get-all-carnames`)
    .then(res => {
      dispatch({ type: types.CARNAME_GET_SUCCESS, payload: res?.data });
      let carnames = res.data.CarNames;
      carnames = carnames.map(el => ({ label: el.name, value: el._id, _id: el._id }));

      setData && setData(carnames);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CARNAME_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};

export const getCarsByNameSreach = (name, setData) => dispatch => {
  dispatch({ type: types.CARNAME_SREACH_GET_LOADING });

  axios
    .post(`${BASE_URL}/api/admin/carname/get-carname-sreach`, { name })
    .then(res => {
      dispatch({ type: types.CARNAME_SREACH_GET_SUCCESS, payload: res?.data });
      let carnames = res.data.cars;

      // Check if carnames is defined before mapping
      if (carnames) {
        carnames = carnames.map(el => ({ label: el.name, value: el._id, _id: el._id }));
        setData && setData(carnames);
      } else {
        // Handle the case where carnames is undefined
        console.error('Carnames is undefined:', res);
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CARNAME_SREACH_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};

export const getAllCar_Id = setData => dispatch => {
  dispatch({ type: types.CARNAME_GET_LOADING });
  axios
    .get(`${BASE_URL}/api/admin/carname/get-all-carId`)
    .then(res => {
      dispatch({ type: types.CARNAME_GET_SUCCESS, payload: res?.data });
      let carnames = res.data.carDetails;
      carnames = carnames.map(el => ({ label: el.Car_id, value: el._id }));

      setData && setData(carnames);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CARNAME_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};

export const UpdateCarNameByID = (id, data, toast, navigate, token) => dispatch => {
  dispatch({ type: types.CARNAME_UPDATE_LOADING });
  axios
    .patch(`${BASE_URL}/api/admin/carname/update-carname/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CARNAME_UPDATE_SUCCESS });
      toast({
        title: `Set Color Status to ${data.status.toUpperCase()}`,
        status: 'success',
        position: 'top',
        duration: 4000
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CARNAME_UPDATE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const DeleteCarNameByID = (id, toast, getData, token) => dispatch => {
  dispatch({ type: types.CARNAME_DELETE_LOADING });
  axios
    .delete(`${BASE_URL}/api/admin/carname/delete-carname/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CARNAME_DELETE_SUCCESS });
      toast({
        title: `Deleted The Color Successfully`,
        status: 'success',
        position: 'top',
        duration: 4000
      });
      getData();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CARNAME_DELETE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const postCarName = (data, navigate, toast, getData, token) => dispatch => {
  dispatch({ type: types.CARNAME_POST_LOADING });
  axios
    .post(`${BASE_URL}/api/admin/carname/add-carname`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CARNAME_POST_SUCCESS });
      toast({
        title: 'Color Added Successfull!',
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
        type: types.CARNAME_POST_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
