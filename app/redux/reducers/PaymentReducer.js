import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function PaymentReducer(state = initialState, action) {
    switch (action.type) {
        case types.PAYMENT_DUES:
            return { ...state, loading: true };
        case types.DO_PAYMENT_DUES_SUCCESS:
            console.log("sucesss DO_PAYMENT_DUES_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_PAYMENT_DUES_FAIL:
            console.log("fails DO_PAYMENT_DUES_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function paymentDues(header, player_id) {
    console.log("paymentDues ", header, player_id)

    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `player/payment-dues?player_id=${player_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                },
            }
        }
    };

}
