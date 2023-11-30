import * as CarComponentTypes from "../Types/Admin/CarComponents.type";

const initState = {
    carModels: [],
    carModelsByID: {},
    totalCarModels: 0,
    allCarModels: [],

    carNames: [],
    carNameByID: {},
    totalCarNames: 0,
    allCarNames: [],

    bodyTypes: [],
    bodyTypeByID: {},
    totalBodyTypes: 0,
    allBodyTypes: [],

    makes: [],
    makeByID: {},
    totalMakes: 0,
    allMakes: [],

    colors: [],
    colorByID: {},
    totalColors: 0,
    allColors: [],

    locations: [],
    locationByID: {},
    totalLocations: 0,
    current_location: {},
    allLocations: [],

    loading: false,
    error: false,
};

export const carComponentReducer = (state = initState, { type, payload }) => {
    switch (type) {
        //? get CARMODEL
        case CarComponentTypes.CARMODEL_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARMODEL_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARMODEL_GET_SUCCESS: {
            return { ...state, loading: false, error: false, allCarModels: payload?.allCarModels, carModels: payload?.CarModels, totalCarModels: payload?.totalCarModels };
        }

        case CarComponentTypes.CARMODEL_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARMODEL_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARMODEL_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, carModelsByID: payload, };
        }
        //? Post CARMODEL
        case CarComponentTypes.CARMODEL_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARMODEL_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARMODEL_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte CARMODEL
        case CarComponentTypes.CARMODEL_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARMODEL_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARMODEL_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete CARMODEL
        case CarComponentTypes.CARMODEL_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARMODEL_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARMODEL_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }



        //? get BODTYTYPE
        case CarComponentTypes.BODYTYPE_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.BODYTYPE_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.BODYTYPE_GET_SUCCESS: {
            return { ...state, loading: false, error: false, allBodyTypes: payload?.allBodyTypes, bodyTypes: payload?.BodyTypes, totalBodyTypes: payload?.totalBodyTypes };
        }

        case CarComponentTypes.BODYTYPE_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.BODYTYPE_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.BODYTYPE_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, bodyTypeByID: payload, };
        }
        //? Post BODTYTYPE
        case CarComponentTypes.BODYTYPE_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.BODYTYPE_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.BODYTYPE_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte BODTYTYPE
        case CarComponentTypes.BODYTYPE_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.BODYTYPE_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.BODYTYPE_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete BODTYTYPE
        case CarComponentTypes.BODYTYPE_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.BODYTYPE_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.BODYTYPE_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }




        //? get MAKE
        case CarComponentTypes.MAKE_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.MAKE_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.MAKE_GET_SUCCESS: {
            return { ...state, loading: false, error: false, allMakes: payload?.allMakes, makes: payload?.Makes, totalMakes: payload?.totalMakes };
        }

        case CarComponentTypes.MAKE_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.MAKE_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.MAKE_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, makeByID: payload, };
        }
        //? Post MAKE
        case CarComponentTypes.MAKE_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.MAKE_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.MAKE_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte MAKE
        case CarComponentTypes.MAKE_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.MAKE_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.MAKE_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete MAKE
        case CarComponentTypes.MAKE_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.MAKE_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.MAKE_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }




        //? get COLOR
        case CarComponentTypes.COLOR_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.COLOR_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.COLOR_GET_SUCCESS: {
            return { ...state, loading: false, error: false, allColors: payload?.allColors, colors: payload?.Colors, totalColors: payload?.totalColors };
        }

        case CarComponentTypes.COLOR_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.COLOR_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.COLOR_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, colorByID: payload, };
        }
        //? Post COLOR
        case CarComponentTypes.COLOR_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.COLOR_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.COLOR_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte COLOR
        case CarComponentTypes.COLOR_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.COLOR_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.COLOR_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete COLOR
        case CarComponentTypes.COLOR_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.COLOR_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.COLOR_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }




        //? get LOCATION
        case CarComponentTypes.LOCATION_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.LOCATION_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.LOCATION_GET_SUCCESS: {
            return { ...state, loading: false, error: false, allLocations: payload?.allLocations, locations: payload?.Locations, totalLocations: payload?.totalLocations };
        }

        case CarComponentTypes.LOCATION_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.LOCATION_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.LOCATION_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, locationByID: payload, };
        }
        //? Post LOCATION
        case CarComponentTypes.LOCATION_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.LOCATION_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.LOCATION_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte LOCATION
        case CarComponentTypes.LOCATION_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.LOCATION_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.LOCATION_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete LOCATION
        case CarComponentTypes.LOCATION_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.LOCATION_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.LOCATION_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }

        //? get CARNAME
        case CarComponentTypes.CARNAME_GET_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARNAME_GET_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARNAME_GET_SUCCESS: {
            return { ...state, loading: false, error: false, allCarNames: payload?.allCarNames, carNames: payload?.CarNames, totalCarNames: payload?.totalCarNames };
        }

        case CarComponentTypes.CARNAME_GET_BY_ID_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARNAME_GET_BY_ID_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARNAME_GET_BY_ID_SUCCESS: {
            return { ...state, loading: false, error: false, carNamesByID: payload, };
        }
        //? Post CARNAME
        case CarComponentTypes.CARNAME_POST_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARNAME_POST_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARNAME_POST_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Updte CARNAME
        case CarComponentTypes.CARNAME_UPDATE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARNAME_UPDATE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARNAME_UPDATE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }
        //? Delete CARNAME
        case CarComponentTypes.CARNAME_DELETE_LOADING: {
            return { ...state, loading: true, error: false, };
        }
        case CarComponentTypes.CARNAME_DELETE_ERROR: {
            return { ...state, loading: false, error: true, };
        }
        case CarComponentTypes.CARNAME_DELETE_SUCCESS: {
            return { ...state, loading: false, error: false };
        }


        default: {
            return state;
        }
    }
};