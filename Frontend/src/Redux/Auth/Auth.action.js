
import axios from "axios";
import * as types from "./Auth.types";
import { BASE_URL } from "../../utils/config";

export const loginAdmin = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.USER_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/user/admin-login`, payload)
        .then((res) => {
            dispatch({ type: types.USER_AUTH_LOGIN_SUCCESS, payload: res?.data });
            toast({
                title: "Login Successfull!",
                description: "You have succesfully logged in as an admin",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/admin");
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.USER_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const loginVendor = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.CARVENDOR_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/vendor/login`, payload)
        .then((res) => {
            if (res?.data?.vendor?.status == "pending") {
                return toast({
                    title: "Login Failed!",
                    description: "Your profile is under review, kindly wait for the confirmation!",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                });
            } else if (res?.data?.vendor?.status == "disabled") {
                return toast({
                    title: "Login Suspended!",
                    description: "Your profile is suspended, kindly contact administrator!",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                dispatch({ type: types.CARVENDOR_AUTH_LOGIN_SUCCESS, payload: res?.data });
                toast({
                    title: "Login Successfull!",
                    description: "You have succesfully logged in as Vendor",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/vendor");
            }
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.CARVENDOR_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};



export const ForgotVendor = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.CARVENDOR_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/vendor/forgot-pass`, payload)
        .then((res) => {
           
                dispatch({ type: types.CARVENDOR_AUTH_LOGIN_SUCCESS, payload: res?.data });
                toast({
                    title: "Reset Password",
                    description: "Password successfully send on your registed email",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/forgot-password");
           
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.CARVENDOR_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const loginEmployee = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.EMPLOYEE_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/employee/login`, payload)
        .then((res) => {
            if (res?.data?.employee?.status == "pending") {
                return toast({
                    title: "Login Failed!",
                    description: "Your profile is under review, kindly wait for the confirmation!",
                    status: "warning",
                    duration: 4000,
                    isClosable: true,
                });
            } else if (res?.data?.employee?.status == "disabled") {
                return toast({
                    title: "Login Suspended!",
                    description: "Your profile is suspended, kindly contact administrator!",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                });
            } else {
                dispatch({ type: types.EMPLOYEE_AUTH_LOGIN_SUCCESS, payload: res?.data });
                toast({
                    title: "Login Successfull!",
                    description: "You have succesfully logged in as Employee",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/employee");
            }
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.EMPLOYEE_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const ForgotEmployee = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.EMPLOYEE_AUTH_LOGIN_LOADING });
    

    axios
        .post(`${BASE_URL}/api/employee/forgot-pass`, payload)
        .then((res) => {
           
                dispatch({ type: types.EMPLOYEE_AUTH_LOGIN_SUCCESS, payload: res?.data });
                toast({
                    title: "Reset Password",
                    description: "Password successfully send on your registed email",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });
                navigate("/forgot-password");
           
        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.EMPLOYEE_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const loginCustomer = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.CUSTOMER_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/customer/login`, payload)
        .then((res) => {
            dispatch({ type: types.CUSTOMER_AUTH_LOGIN_SUCCESS, payload: res?.data });
            toast({
                title: "Login Successfull!",
                description: "You have succesfully logged in as Customer",
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            const previous_url = localStorage.getItem("previous_url")

            if (previous_url) {
                navigate(previous_url);
            } else {
                navigate("/customer");
            }
            localStorage.removeItem("previous_url")


        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            dispatch({
                type: types.CUSTOMER_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};
export const loginCustomerPhone = (phone_number, navigate, toast) => (dispatch) => {
    let payload = { phone_number }
    dispatch({ type: types.CUSTOMER_AUTH_LOGIN_LOADING });

    axios
        .post(`${BASE_URL}/api/customer/phone-login`, payload)
        .then((res) => {
            // dispatch({ type: types.CUSTOMER_AUTH_LOGIN_SUCCESS, payload: res?.data });
            // toast({
            //     title: "Login Successfull!",
            //     description: "You have succesfully logged in as Customer",
            //     status: "success",
            //     duration: 4000,
            //     isClosable: true,
            // });

            // const previous_url = localStorage.getItem("previous_url")

            // if (previous_url) {
            //     navigate(previous_url);
            // } else {
            //     navigate("/customer");
            // }
            // localStorage.removeItem("previous_url")
            navigate("/customer-email-login")

        })
        .catch((err) => {
            console.log(err);
            toast({
                title: "Login Failed!",
                description: err?.response?.data?.message,
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            navigate("/customer-register")
            dispatch({
                type: types.CUSTOMER_AUTH_LOGIN_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};

export const signupCustomer = (payload, navigate, toast) => (dispatch) => {
    dispatch({ type: types.CUSTOMER_AUTH_SIGNUP_LOADING });

    axios
        .post(`${BASE_URL}/api/customer/register`, payload)
        .then((res) => {

            dispatch({ type: types.CUSTOMER_AUTH_SIGNUP_SUCCESS, payload: res?.data });
            toast({
                title: "Signup Successfull!",
                description: "You have succesfully Signed Up as Customer",
                status: "success",
                duration: 4000,
                isClosable: true,
            });
            navigate("/customer");
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
                type: types.CUSTOMER_AUTH_SIGNUP_ERROR,
                payload: err?.response?.data?.message,
            });
        });
};