import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function UpcomingTournamentReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_UPCOMING_TOURNAMENT:
            return { ...state, loading: true };
        case types.DO_UPCOMING_TOURNAMENT_SUCCESS:
            console.log("sucesss DO_TOURNAMENT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_UPCOMING_TOURNAMENT_FAIL:
            console.log("fails DO_TOURNAMENT_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getUpcomingTournament(header, param) {
    console.log("getUpcomingTournament", header)

    return {
        type: types.GET_UPCOMING_TOURNAMENT,
        payload: {
            request: {
                url: `global/tournament/upcoming?${param}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getTournamentById(header, tournament_id) {
    console.log("getUpcomingTournament", header)

    return {
        type: types.GET_UPCOMING_TOURNAMENT,
        payload: {
            request: {
                url: `global/tournament/${tournament_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

