import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function NotificationReducer(state = initialState, action) {
    switch (action.type) {
        case types.NOTIFICATION_TOURNAMENT:
            return { ...state, loading: true };
        case types.DO_NOTIFICATION_SUCCESS:
            console.log("sucesss DO_TOURNAMENT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_NOTIFICATION_FAIL:
            console.log("fails DO_NOTIFICATION_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getNotificationListing(header) {
    console.log("getUpcomingTournament", header)

    return {
        type: types.NOTIFICATION_TOURNAMENT,
        payload: {
            request: {
                url: `notification/notifications`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

