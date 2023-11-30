import * as CarTypes from "../../Types/Vendors/Car.type";

const initState = {
    cars: [],
    carByID: {},
    similarCars: [],
    totalCars: 0,
    location: JSON.parse(localStorage.getItem("location_carvendor")) || {},
    loading: false,
    error: false,
};

export const carReducer = (state = initState, { type, payload }) => {
    switch (type) {
        //? get CAR
        case CarTypes.CAR_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarTypes.CAR_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarTypes.CAR_GET_SUCCESS: {
            return { ...state, loading: false, error: false, cars: payload?.Cars, totalCars: payload?.totalCars };
        }

        case CarTypes.CAR_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarTypes.CAR_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarTypes.CAR_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, carByID: payload?.Car, similarCars: payload?.similarCars };
        }
        //? Post CAR
        case CarTypes.CAR_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarTypes.CAR_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarTypes.CAR_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte CAR
        case CarTypes.CAR_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarTypes.CAR_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarTypes.CAR_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete CAR
        case CarTypes.CAR_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarTypes.CAR_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarTypes.CAR_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        case CarTypes.LOCATION_LOADING: {
            return { ...state, loading: true, error: false };
        }
        case CarTypes.LOCATION_SUCCESS: {
            return { ...state, loading: false, error: false, location: payload };
        }

        default: {
            return state;
        }
    }
};