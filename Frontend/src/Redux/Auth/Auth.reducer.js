import * as types from './Auth.types';

const UserInitState = {
  token: JSON.parse(localStorage.getItem('admin_token_carvendor')),
  isAuth: JSON.parse(localStorage.getItem('admin_token_carvendor')) ? true : false,
  User_detail: JSON.parse(localStorage.getItem('user_detail_carvendor')) || null,
  loading: false,
  error: false
};
const VendorInitState = {
  token: JSON.parse(localStorage.getItem('vendor_token_carvendor')) || null,
  isAuth: JSON.parse(localStorage.getItem('vendor_token_carvendor')) ? true : false,
  Vendor_detail: JSON.parse(localStorage.getItem('vendor_detail_carvendor')) || null,
  loading: false,
  error: false
};
const EmployeeInitState = {
  token: JSON.parse(localStorage.getItem('employee_token_carvendor')),
  isAuth: JSON.parse(localStorage.getItem('employee_token_carvendor')) ? true : false,
  Employee_detail: JSON.parse(localStorage.getItem('employee_detail_carvendor')) || null,
  loading: false,
  error: false
};
const CustomerInitState = {
  token: JSON.parse(localStorage.getItem('customer_token_carvendor')) || null,
  isAuth: JSON.parse(localStorage.getItem('customer_token_carvendor')) ? true : false,
  Customer_detail: JSON.parse(localStorage.getItem('customer_detail_carvendor')) || null,
  loading: false,
  error: false
};

export const UserAuthReducer = (state = UserInitState, { type, payload }) => {
  switch (type) {
    case types.USER_AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case types.USER_AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case types.USER_AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('admin_token_carvendor', JSON.stringify(payload?.token));
      localStorage.setItem('user_detail_carvendor', JSON.stringify(payload?.user));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: payload?.token,
        User_detail: payload?.user
      };
    }

    case types.USER_LOGOUT: {
      localStorage.removeItem('admin_token_carvendor');
      localStorage.removeItem('user_detail_carvendor');
      return {
        ...state,
        isAuth: false,
        token: null,
        User_detail: null
      };
    }

    default: {
      return state;
    }
  }
};
export const VendorAuthReducer = (state = VendorInitState, { type, payload }) => {
  switch (type) {
    case types.CARVENDOR_AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case types.CARVENDOR_AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case types.CARVENDOR_AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('vendor_token_carvendor', JSON.stringify(payload?.token));
      localStorage.setItem('vendor_detail_carvendor', JSON.stringify(payload?.vendor));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: payload?.token,
        Vendor_detail: payload?.vendor
      };
    }

    case types.CARVENDOR_LOGOUT: {
      localStorage.removeItem('vendor_token_carvendor');
      localStorage.removeItem('vendor_detail_carvendor');
      return {
        ...state,
        isAuth: false,
        token: null,
        Vendor_detail: null
      };
    }

    default: {
      return state;
    }
  }
};
export const EmployeeAuthReducer = (state = EmployeeInitState, { type, payload }) => {
  switch (type) {
    case types.EMPLOYEE_AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case types.EMPLOYEE_AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case types.EMPLOYEE_AUTH_LOGIN_SUCCESS: {
      localStorage.setItem('employee_token_carvendor', JSON.stringify(payload?.token));
      localStorage.setItem('employee_detail_carvendor', JSON.stringify(payload?.employee));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: payload?.token,
        Employee_detail: payload?.employee
      };
    }

    case types.CARVENDOR_LOGOUT: {
      localStorage.removeItem('employee_token_carvendor');
      localStorage.removeItem('employee_detail_carvendor');
      return {
        ...state,
        isAuth: false,
        token: null,
        Employee_detail: null
      };
    }

    default: {
      return state;
    }
  }
};
export const CustomerAuthReducer = (state = CustomerInitState, { type, payload }) => {
  switch (type) {
    case types.CUSTOMER_AUTH_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case types.CUSTOMER_AUTH_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case types.CUSTOMER_AUTH_LOGIN_SUCCESS: {
      console.log(payload?.customer.otp_verified);
      if (payload?.customer.otp_verified === true) {
        localStorage.setItem('customer_token_carvendor', JSON.stringify(payload?.token));
        localStorage.setItem('customer_detail_carvendor', JSON.stringify(payload?.customer));
      }

      localStorage.setItem('customer_detail_email', JSON.stringify(payload?.customer.email));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: payload?.token,
        Customer_detail: payload?.customer
      };
    }

    case types.CUSTOMER_AUTH_UPDATE_SUCCESS: {
      localStorage.setItem('customer_detail_carvendor', JSON.stringify(payload?.customer));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        Customer_detail: payload?.customer
      };
    }

    case types.CUSTOMER_AUTH_SIGNUP_LOADING: {
      return {
        ...state,
        loading: true,
        error: false
      };
    }
    case types.CUSTOMER_AUTH_SIGNUP_ERROR: {
      return {
        ...state,
        loading: false,
        error: true
      };
    }

    case types.CUSTOMER_AUTH_SIGNUP_SUCCESS: {
      //   localStorage.setItem('customer_token_carvendor', JSON.stringify(payload?.token));
      //   localStorage.setItem('customer_detail_carvendor', JSON.stringify(payload?.customer));
      localStorage.setItem('customer_detail_email', JSON.stringify(payload?.customer.email));
      return {
        ...state,
        loading: false,
        error: false,
        isAuth: true,
        token: payload?.token,
        Customer_detail: payload?.customer
      };
    }

    case types.CUSTOMER_LOGOUT: {
      localStorage.removeItem('customer_token_carvendor');
      localStorage.removeItem('customer_detail_carvendor');
      return {
        ...state,
        isAuth: false,
        token: null,
        Customer_detail: null
      };
    }

    default: {
      return state;
    }
  }
};
