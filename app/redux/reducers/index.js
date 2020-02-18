import { combineReducers } from 'redux'
import LoginReducer from './loginReducer'
import AcademyReducer from './AcademyReducer'
import SwitchReducer from './switchReducer'
import DashboardReducer from './dashboardReducer'
import BatchReducer from './BatchReducer'
import ProfileReducer, {UserProfile} from './ProfileReducer'
import PlayerBatchReducer from './PlayerBatchReducer'
import TournamentReducer from './TournamentReducer'
import PerformenceReducer from './PerformenceReducer'
import FeedbackReducer from './FeedbackReduer'
import RewardReducer from './RewardReducer'
import ChallengeReducer from './ChallengeReducer'
import coachReducer from './CoachReducer'
import UpcomingTournamentReducer from './UpcomingReducer'
import TournamentScorerReducer from './TournamentScorer'
import TournamentRegReducer from './TournamentRegReducer'
import TournamentFilter from './TournamentFilter'
import NotificationReducer from './NotificationReducer'
import CommonReducer from './CommonReducer'
import BatchAttendenceReducer from './BatchAttendenceReducer'
import DietPlanReducer from './DietPlanReducer'
import PaymentReducer from './PaymentReducer'
import CourtBookingReducer from './CourtBookingReducer'
import PlayerReducer from './PlayerReducer'
import ChallengeResultReducer from './ChallengeResultReducer'
import ChallengeLeaderboardReducer from './ChallengeLeaderboardReducer'
import EditPartnerReducer from './EditPartnerReducer'
import RelationReducer from './RelationReducer'
import BrowseAcademyReducer from './BrowseAcademyReducer'
import AcademyBatchReducer from './AcademyBatchReducer'
import CancelBatchReducer from './CancelBatchReducer'
import PlayerProgressReducer from './PlayerProgressReducer'
import EnrollmentFormReducer from './EnrollmentFormReducer'
import CompensatoryBatchReducer from './CompensatoryBatchReducer'
import TrialSessionReducer from './TrialSessionReducer'

const rootReducer = combineReducers({
    LoginReducer,
    AcademyReducer,
    coachReducer,
    SwitchReducer,
    DashboardReducer,
    BatchReducer,
    ProfileReducer,
    UserProfile,
    PlayerBatchReducer,
    PerformenceReducer,
    TournamentReducer,
    FeedbackReducer,
    RewardReducer,
    ChallengeReducer,
    UpcomingTournamentReducer,
    TournamentScorerReducer,
    TournamentRegReducer,
    TournamentFilter,
    NotificationReducer,
    CommonReducer,
    BatchAttendenceReducer,
    DietPlanReducer,
    PaymentReducer,
    CourtBookingReducer,
    PlayerReducer,
    ChallengeResultReducer,
    ChallengeLeaderboardReducer,
    EditPartnerReducer,
    RelationReducer,
    BrowseAcademyReducer,
    AcademyBatchReducer,
    CancelBatchReducer,
    PlayerProgressReducer,
    EnrollmentFormReducer,
    CompensatoryBatchReducer,
    TrialSessionReducer
});

export default rootReducer
