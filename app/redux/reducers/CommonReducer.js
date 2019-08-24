import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function CommonReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_COMMON:
            return { ...state, loading: true };
        case types.DO_COMMON_SUCCESS:
            console.log("sucesss DO_TOURNAMENT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_COMMON_FAIL:
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

export function getNotificationCount(header,param) {
    console.log("getNotificationCount", header)
    return {
        type: types.GET_COMMON,
        payload: {
            request: {
                url: `notification/notification-count`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

