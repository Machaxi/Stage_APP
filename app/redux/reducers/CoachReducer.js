import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    res: '',
    error: null,
};

export default function coachReducer(state = initialState, action) {
    switch (action.type) {

        case types.GET_COACH1:
            return { ...state, loading: true };
        case types.DO_COACH1_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, res: action.payload.data };
        case types.DO_COACH1_FAIL:
            console.log("fails", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function coachListing(academy_id, header) {

    console.log("coachListing => " + academy_id)
    return {
        type: types.GET_COACH1,
        payload: {
            request: {
                url: `global/coach/list?academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    }
};

export function getDisputedChallenges(header, academy_id) {
    return {
        type: types.GET_COACH1,
        payload: {
            request: {
                url: `challenge/disputed?academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}



