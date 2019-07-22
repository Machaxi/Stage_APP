import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function ChallengeReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CHALLENGE:
            return { ...state, loading: true };
        case types.DO_CHALLENGE_SUCCESS:
            console.log("sucesss DO_CHALLENGE_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_CHALLENGE_FAIL:
            console.log("fails DO_CHALLENGE_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching challenge'
            };
        default:
            return state;
    }
}

export function getChallengeDashboard(header, academy_id) {
    console.log("getChallengeDashboard", header, tournament_id)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `challenge/dashboard?academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

