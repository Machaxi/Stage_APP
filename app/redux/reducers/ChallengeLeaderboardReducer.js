import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function ChallengeLeaderboardReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CHALLENGE_LEADERBOARD:
            return { ...state, loading: true };
        case types.DO_CHALLENGE__LEADERBOARD_SUCCESS:
            console.log("sucesss DO_CHALLENGE__RESULT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_CHALLENGE__LEADERBOARD_FAIL:
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


export function getchallengeLeaderboard(header, academy_id, month, year) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE_LEADERBOARD,
        payload: {
            request: {
                url: `challenge/leader-board?academy_id=${academy_id}&month=${month}&year=${year}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

