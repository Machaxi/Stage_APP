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
    console.log("submitFeedback",header)
    
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