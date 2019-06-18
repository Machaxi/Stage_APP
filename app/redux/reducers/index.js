import { combineReducers } from 'redux'
import LoginReducer from './loginReducer'
import AcademyReducer from './AcademyReducer'
import SwitchReducer from './switchReducer'
import DashboardReducer from './dashboardReducer'
// import CartReducer from './cartReducer'
// import AddressReducer from './addressReducer'
// import ShippingReducer from './shippingReducer'
// import ShippingAddressReducer from './shippingAddressReducer'
// import CodReducer from './codReducer'
// import { homeSliderReducer, homeInstaReducer } from './homePage';
// import productListReducer from './productListing';
// import filterData from './filterData';
// import CartCountReducer from './cartCountReducer'
//import LogoutReducer from './logoutReducer'

const rootReducer = combineReducers({
     LoginReducer,
     AcademyReducer,
     SwitchReducer,
    DashboardReducer,
    // homeSliderReducer,
    // homeInstaReducer,
    // productListReducer,
    // CartReducer,
    // AddressReducer,
    // ShippingReducer,
    // ShippingAddressReducer,
    // CodReducer,
    // filterData,
    // CartCountReducer,
    // LogoutReducer
});

export default rootReducer
