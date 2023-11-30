
import axios from "axios";
import * as types from "../Types/Employee.type";
import { BASE_URL } from "../../../utils/config";

export const getEmployees = (params, token) => (dispatch) => {

    dispatch({ type: types.EMPLOYEE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/employee/get-all-employees`, {
            params,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.EMPLOYEE_GET_SUCCESS, payload: res?.data });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.EMPLOYEE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getEmployeesList = (setData) => (dispatch) => {

    dispatch({ type: types.EMPLOYEE_GET_LOADING });
    axios
        .get(`${BASE_URL}/api/employee/get-all-employees-list`)
        .then((res) => {
            dispatch({ type: types.EMPLOYEE_GET_SUCCESS, payload: res?.data });
            setData && setData(res?.data?.employees)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.EMPLOYEE_GET_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const getEmployeeByID = (id, setData, toast, navigate, token) => (dispatch) => {
    if (!id) return dispatch({ type: types.EMPLOYEE_GET_BY_ID_ERROR, });
    dispatch({ type: types.EMPLOYEE_GET_BY_ID_LOADING });
    axios
        .get(`${BASE_URL}/api/employee/get-employee/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.EMPLOYEE_GET_BY_ID_SUCCESS, payload: res?.data?.employee });

            setData(res?.data?.employee)
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.EMPLOYEE_GET_BY_ID_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Find Employee By Provided ID!",
                status: "error",
                position: "top",
                duration: 4000,
            });
            navigate("/admin/employees")
        });
};
export const UpdateEmployeeByID = (id, data, toast, navigate, title, token) => (dispatch) => {

    dispatch({ type: types.EMPLOYEE_UPDATE_LOADING });
    axios
        .patch(`${BASE_URL}/api/employee/update/${id}`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.EMPLOYEE_UPDATE_SUCCESS });
            toast({
                title: title || "Updated Successfully",
                status: "success",
                position: "top",
                duration: 4000,
            });
            navigate("/admin/employees")
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.EMPLOYEE_UPDATE_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Update Employee",
                status: "error",
                position: "top",
                duration: 4000,
            });
        });
};
export const DeleteEmployeeByID = (id, toast, getData, token) => (dispatch) => {

    dispatch({ type: types.EMPLOYEE_DELETE_LOADING });
    axios
        .delete(`${BASE_URL}/api/employee/delete/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {

            dispatch({ type: types.EMPLOYEE_DELETE_SUCCESS });
            toast({
                title: `Deleted The Employee Successfully`,
                status: "success",
                position: "top",
                duration: 4000,
            });
            getData()
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: types.EMPLOYEE_DELETE_ERROR,
                payload: err?.response?.data?.message,
            });
            toast({
                title: "Cannot Delete Employee",
                status: "error",
                position: "top",
                duration: 4000,
            });
        });
};
export const postEmployee = (data, navigate, toast, token) => (dispatch) => {
    dispatch({ type: types.EMPLOYEE_POST_LOADING });
    axios
        .post(`${BASE_URL}/api/employee/add-employee`, data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        })
        .then((res) => {
            dispatch({ type: types.EMPLOYEE_POST_SUCCESS });
            toast({
                title: "Employee Added Successfully!",
                status: "success",
                position: "top",
                duration: 4000,
            });

            navigate("/admin/employees");
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Creating Employee Failed!",
                description: err?.response?.data?.message || "Something went wrong",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.EMPLOYEE_POST_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};