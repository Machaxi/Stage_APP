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
    console.log("getChallengeDashboard", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
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

export function createChallenge(header, postData) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/create`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getOpponentList(header, academy_id, page, size) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/opponent-list?academy_id=${academy_id}&page=${page}&size=${size}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function acceptChallenge(header, challenge_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/${challenge_id}/accept`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function cancelChallenge(header, challenge_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/${challenge_id}/cancel`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function dismissChallenge(header, challenge_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/${challenge_id}/dismiss`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function abortChallenge(header, challenge_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/${challenge_id}/abort`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function disputeChallenge(header, challenge_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/${challenge_id}/dispute`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getchallengeResults(header, academy_id, month, year) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/results?academy_id=${academy_id}&month=${month}&year=${year}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getChallengeScore(header, challenge_id) {
    //console.log("createChallenge", header, academy_id)

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/match-scores?challenge_id=${challenge_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function updateChallengeScore(header, postData) {

    return {
        type: types.GET_CHALLENGE,
        payload: {
            request: {
                url: `challenge/update-score`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

