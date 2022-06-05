import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function PaymentReducer(state = initialState, action) {
    console.log("D", state, action);
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
        case types.PAYMENT_BUYMEMBERSHIP_SUCCESS:
            console.log("Inside",action.payload.data)
                return { ...state, loading: false, data: action.payload.data };
        case types.SUBMITPAYMENTCONFIRMATION:
            console.log("Inside",action.payload.data)
                return { ...state, loading: false, data: action.payload.data };
        default:
            return state;
    }
}

export function paymentDues(header, player_id, academy_id) {
    console.log("paymentDues ", header, player_id)

    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `payment/payment-dues-academy?player_id=${player_id}&academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                },
            }
        }
    };

}

export function getPlayerSWitcher(header) {
    console.log("getPlayerSWitcher", header)

    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `player/switcher`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getPaymentHistory(header, month, year, academy_id, player_user_id) {
    console.log("getPaymentHistory", header)

    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `payment/payment-history?month=${month}&year=${year}&academy_id=${academy_id}&player_user_id=${player_user_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function duePay(header, postData) {
    console.log('duePay=> ', JSON.stringify(postData))
    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `payment/due-pay-multiple`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}

export function getAcademyPaymentDues(header, postData) {
    console.log('duePay=> ', JSON.stringify(postData))
    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `payment/academy-payment-dues`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}

export function settlePaymentDues(header, postData) {
    console.log('duePay=> ', JSON.stringify(postData))
    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `payment/settle-payment`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}

export function getAcademyPaymentList(header, postData, page, size) {
    console.log('duePay=> ', JSON.stringify(postData))
    return {
        type: types.PAYMENT_DUES,
        payload: {
            request: {
                url: `payment/academy-payment-list?page=${page}&size=${size}`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}

export function startBatchPayment(header, postData) {
    console.log('BatchPayment=> ', JSON.stringify(postData))
    return {
        type: types.PAYMENT_BUYMEMBERSHIP,
        payload: {
            request: {
                url: `batch/player/select-weekly-plan`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}

export function submitPaymentConfirmation(header, postData) {
    console.log('Submit Payment Info=> ', JSON.stringify(postData))
    return {
        type: types.SUBMITPAYMENTCONFIRMATION,
        payload: {
            request: {
                url: `payment/due-subscription-plan-payment`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}