import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function TournamentFilter(state = initialState, action) {
    switch (action.type) {
        case types.TOURNAMENT_FILTER:
            return { ...state, loading: true };
        case types.TOURNAMENT_FILTER_SUCCESS:
            console.log("sucesss TOURNAMENT_FILTER_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_UPCOMING_TOURNTOURNAMENT_FILTER_FAILAMENT_FAIL:
            console.log("fails TOURNAMENT_FILTER_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getTournamentFilter() {
    console.log("getTournamentFilter")

    return {
        type: types.TOURNAMENT_FILTER,
        payload: {
            request: {
                url: `global/tournament/filter-data`,
                method: 'GET',
            }
        }
    };

}

