import {
    applyMiddleware,
    combineReducers,
    compose,
    legacy_createStore,
} from "redux";
import thunk from "redux-thunk";
import { VendorAuthReducer, UserAuthReducer, CustomerAuthReducer,EmployeeAuthReducer } from "./Auth/Auth.reducer";
import { WebsiteReducer, orderReducer, userReducer, vendorReducer, CustomerReducer, EmployeeReducer, TestDriveReducer, BookingReducer, TransactionReducer, ReportReducer } from "./App/App.reducer";
import { carComponentReducer } from "./App/Reducers/CarComponent.reducer";
import { carReducer } from "./App/Reducers/Vendors/Car.reducer";

const rootReducer = combineReducers({
    UserAuthManager: UserAuthReducer,
    VendorAuthManager: VendorAuthReducer,
    EmployeeAuthManager: EmployeeAuthReducer,
    CustomerAuthManager: CustomerAuthReducer,
    VendorManager: vendorReducer,
    CustomerManager: CustomerReducer,
    EmployeeManager: EmployeeReducer,
    TestDriveManager: TestDriveReducer,
    UserManager: userReducer,
    OrderManager: orderReducer,
    CarComponentManager: carComponentReducer,
    CarManager: carReducer,
    WebsiteManager: WebsiteReducer,
    BookingManager: BookingReducer,
    TransactionManager: TransactionReducer,
    ReportManager: ReportReducer
});


export const store = legacy_createStore(
    rootReducer,
    compose(applyMiddleware(thunk))
);