import { combineReducers } from 'redux'
import LoginReducer from './loginReducer'
import AcademyReducer from './AcademyReducer'
import SwitchReducer from './switchReducer'
import DashboardReducer from './dashboardReducer'
import BatchReducer from './BatchReducer'
import ProfileReducer from './ProfileReducer'
 import PlayerBatchReducer from './PlayerBatchReducer'
 import TournamentReducer from './TournamentReducer'
 import PerformenceReducer from './PerformenceReducer'
 import FeedbackReducer from './FeedbackReduer'
 import RewardReducer from './RewardReducer'
import ChallengeReducer from './ChallengeReducer'

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
    BatchReducer,
    ProfileReducer,
    PlayerBatchReducer,
    PerformenceReducer,
    TournamentReducer,
    FeedbackReducer,
    RewardReducer,
    ChallengeReducer
    // AddressReducer,
    // ShippingReducer,
    // ShippingAddressReducer,
    // CodReducer,
    // filterData,
    // CartCountReducer,
    // LogoutReducer
});

export default rootReducer
