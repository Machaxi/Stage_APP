import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function EditPartnerReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_EDIT_PARTNER:
            return { ...state, loading: true };
        case types.DO_EDIT_PARTNER_SUCCESS:
            console.log("sucesss DO_EDIT_PARTNER_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };

        case types.DO_EDIT_PARTNER_FAIL:
            console.log("fails DO_EDIT_PARTNER_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}



export function editPartner(header,data) {
    console.log("editPartner", data)

    return {
        type: types.GET_EDIT_PARTNER,
        payload: {
            request: {
                url: `tournament/edit-partner-details`,
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
