import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    profileData: '',
    error: null,
};
export default function EnrollmentFormReducer(state = initialState, action) {
    switch (action.type) {
        case types.ENROLLMENT_FORM:
            return { ...state, loading: true };
        case types.ENROLLMENT_FORM_SUCCESS:
            console.log("sucesss PROFILE", action.payload.data);
            return { ...state, loading: false, enrollmentData: action.payload.data };
        case types.ENROLLMENT_FORM_FAIL:
            console.log("fails GET_PROFILE", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getEnrollmentFormData(header, player_id, academy_id) {
    console.log("getPlayerDashboard ", header, player_id, academy_id)
    if (academy_id == null)
        academy_id = ''
    return {
        type: types.ENROLLMENT_FORM,
        payload: {
            request: {
                url: `player/player-enrollment?player_id=${player_id}&academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

export function saveEnrollmentFormData(header, postData) {
    return {
      type: types.ENROLLMENT_FORM,
      payload: {
        request: {
          url: 'court/book',
          method: 'POST',
          data: postData,
          headers: {
            'x-authorization': header
          },
        }
      }
    }
};