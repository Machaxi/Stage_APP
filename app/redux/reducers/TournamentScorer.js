import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function TournamentScorerReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_TOURNAMENT_SCORER:
            return { ...state, loading: true };
        case types.DO_TOURNAMENT_SCORER_SUCCESS:
            console.log("sucesss DO_TOURNAMENT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_TOURNAMENT_SCORER_FAIL:
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

export function getMatchScore(header, match_id) {
    console.log("getUpcomingTournament", header + ' match_id => ', match_id)

    return {
        type: types.GET_TOURNAMENT_SCORER,
        payload: {
            request: {
                url: `tournament/match-scores?match_id=${match_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function updateMatchScore(header, data) {
    console.log("getUpcomingTournament", header + ' data => ', data)

    return {
        type: types.GET_TOURNAMENT_SCORER,
        payload: {
            request: {
                url: `tournament/update-score`,
                method: 'POST',
                data: data,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };

}


export function skipSet(header, data) {
    console.log("SkipSet", header + ' data => ', data)

    return {
        type: types.GET_TOURNAMENT_SCORER,
        payload: {
            request: {
                url: `tournament/skip-sets`,
                method: 'POST',
                data: data,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };

}


export function giveBye(header, data) {
    console.log("GiveBye", header + ' data => ', data)

    return {
        type: types.GET_TOURNAMENT_SCORER,
        payload: {
            request: {
                url: `tournament/give-bye                `,
                method: 'POST',
                data: data,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };

}