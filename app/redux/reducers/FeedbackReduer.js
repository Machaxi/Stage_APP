import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function FeedbackReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_FEEDBACK:
            return { ...state, loading: true };
        case types.DO_FEEDBACK_SUCCESS:
            console.log("sucesss DO_FEEDBACK_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_FEEDBACK_FAIL:
            console.log("fails DO_FEEDBACK_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

export function submitFeedback(header) {
    console.log("submitFeedback", header)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `tournament/upcoming`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}
export function postFeedback(header, postdata) {
    console.log("postFeedback ", header, postdata)

    return {
        type: types.GET_FEEDBACK,
        payload: {
            request: {
                url: `feedback/create`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}

export function postFeedbackMultiple(header, postdata) {
    console.log("postFeedback ", header, postdata)

    return {
        type: types.GET_FEEDBACK,
        payload: {
            request: {
                url: `feedback/createMultiple`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}

export function getCoachListing(header, academy_id, player_id) {
    console.log("getCoachListing ", header, academy_id, player_id)

    return {
        type: types.GET_FEEDBACK,
        payload: {
            request: {
                url: `player/getCoaches?player_id=${player_id}&academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}


export function getMyCoachFeedbackListing(header, academy_id, coach_id) {
    console.log("getMyCoachFeedbackListing ", header, academy_id, coach_id)
    return {
        type: types.GET_FEEDBACK,
        payload: {
            request: {
                url: `global/feedback/getByAcademyCoach?coach_id=${coach_id}&academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}