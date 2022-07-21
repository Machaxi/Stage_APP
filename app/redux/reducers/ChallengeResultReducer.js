import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function ChallengeResultReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CHALLENGE_RESULT:
            return { ...state, loading: true };
        case types.DO_CHALLENGE__RESULT_SUCCESS:
            console.log("sucesss DO_CHALLENGE__RESULT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_CHALLENGE__RESULT_FAIL:
            console.log("fails DO_CHALLENGE__RESULT_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching challenge'
            };
        default:
            return state;
    }
}


export function disputeChallenge(header, challenge_id,player_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE_RESULT,
        payload: {
            request: {
                url: `challenge/${challenge_id}/dispute?player_id=${player_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getchallengeResults(header, academy_id, month, year,player_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE_RESULT,
        payload: {
            request: {
                url: `challenge/results?academy_id=${academy_id}&month=${month}&year=${year}&player_id=${player_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}
