import axios from 'axios';
import * as types from '../../Types/Vendors/Car.type';
import { BASE_URL } from '../../../../utils/config';

export const getCars = (setData, data) => dispatch => {
  dispatch({ type: types.CAR_GET_LOADING });
  axios
    .post(`${BASE_URL}/api/vendor/car/get-cars`, data)
    .then(res => {
      dispatch({ type: types.CAR_GET_SUCCESS, payload: res?.data });
      setData && setData(res?.data);
    })
    .catch(err => {
      console.log(err);
      alert(err.message);
      dispatch({
        type: types.CAR_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getAllCars = (setData, data) => dispatch => {
  dispatch({ type: types.CAR_GET_LOADING });
  axios
    .post(`${BASE_URL}/api/vendor/car/get-all-cars`, data)
    .then(res => {
      dispatch({ type: types.CAR_GET_SUCCESS, payload: res?.data });
      setData && setData(res?.data);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getCarsAdmin = (setData, data, token) => dispatch => {
  dispatch({ type: types.CAR_GET_LOADING });
  axios
    .post(`${BASE_URL}/api/vendor/car/get-all-cars-admin`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CAR_GET_SUCCESS, payload: res?.data });
      setData && setData(res?.data?.Cars);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getCarsHomePage = (id, setData, data) => dispatch => {
  dispatch({ type: types.CAR_GET_LOADING });

  axios
    .get(`${BASE_URL}/api/vendor/car/get-all-cars-home/${id}`, data)
    .then(res => {
      dispatch({ type: types.CAR_GET_SUCCESS, payload: res?.data?.Cars });
      setData && setData(res?.data);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getCarsByVendorID = (id, page, data, setData, token) => dispatch => {
  if (!page) page = 1;
  dispatch({ type: types.CAR_GET_LOADING });
  axios
    .post(`${BASE_URL}/api/vendor/car/get-all-vendor-car/${id}?page=${page}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CAR_GET_SUCCESS, payload: res?.data });
      setData && setData(res?.data?.Cars);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_GET_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getCarByID = (id, toast, setData) => dispatch => {
  if (!id) return;
  dispatch({ type: types.CAR_GET_BY_ID_LOADING });
  axios
    .get(`${BASE_URL}/api/vendor/car/get-car/${id}`)
    .then(res => {
      let car = res?.data?.Car;

      dispatch({ type: types.CAR_GET_BY_ID_SUCCESS, payload: res.data });
      setData && setData(car);
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_GET_BY_ID_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const getSimilarCars = (user_id, id, toast, setData) => dispatch => {
  if (!id) return;
  dispatch({ type: types.CAR_GET_BY_ID_LOADING });
  axios
    .get(`${BASE_URL}/api/vendor/car/get-similar-cars/${user_id}/${id}`)
    .then(res => {
      let similarCars = res?.data?.similarCars;
      dispatch({ type: types.CAR_GET_BY_ID_SUCCESS, payload: res.data });
      setData && setData(similarCars);
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
        type: types.CAR_GET_BY_ID_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const UpdateCarByID = (id, data, toast, getData, title, token) => dispatch => {
  dispatch({ type: types.CAR_UPDATE_LOADING });
  axios
    .patch(`${BASE_URL}/api/vendor/car/update-car/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CAR_UPDATE_SUCCESS });
      getData && getData(id);
      toast({
        title: title || 'Updated Successfully',
        status: 'success',
        position: 'top',
        duration: 4000
      });
      getData && getData();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_UPDATE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const UpdateAdminCarByID = (id, data, toast, getData, navigate, title, token) => dispatch => {
  dispatch({ type: types.CAR_UPDATE_LOADING });
  axios
    .patch(`${BASE_URL}/api/vendor/car/update-car-admin/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CAR_UPDATE_SUCCESS });
      getData && getData(id);
      toast({
        title: title || 'Updated Successfully',
        status: 'success',
        position: 'top',
        duration: 4000
      });
      navigate && navigate('/admin/car');
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_UPDATE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const DeleteCarByID = (id, toast, getData, token) => dispatch => {
  dispatch({ type: types.CAR_DELETE_LOADING });
  axios
    .delete(`${BASE_URL}/api/vendor/car/delete-car/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CAR_DELETE_SUCCESS });
      toast({
        title: `Deleted The Car Successfully`,
        status: 'success',
        position: 'top',
        duration: 4000
      });
      getData();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: types.CAR_DELETE_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
export const postCar = (data, navigate, toast, getData, token) => dispatch => {
  dispatch({ type: types.CAR_POST_LOADING });
  axios
    .post(`${BASE_URL}/api/vendor/car/add-car`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      dispatch({ type: types.CAR_POST_SUCCESS });
      toast({
        title: 'Car Added Successfull!',
        status: 'success',
        position: 'top',
        duration: 4000
      });
      getData();
      navigate('/vendor/cars');
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
        type: types.CAR_POST_ERROR,
        payload: err?.response?.data?.message
      });
    });
};
