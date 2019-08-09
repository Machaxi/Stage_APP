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
import coachReducer from './CoachReducer'
import UpcomingTournamentReducer from './UpcomingReducer'
import TournamentScorerReducer from './TournamentScorer'
import TournamentRegReducer from './TournamentRegReducer'

const rootReducer = combineReducers({
    LoginReducer,
    AcademyReducer,
    coachReducer,
    SwitchReducer,
    DashboardReducer,
    BatchReducer,
    ProfileReducer,
    PlayerBatchReducer,
    PerformenceReducer,
    TournamentReducer,
    FeedbackReducer,
    RewardReducer,
    ChallengeReducer,
    UpcomingTournamentReducer,
    TournamentScorerReducer,
    TournamentRegReducer
});

export default rootReducer
