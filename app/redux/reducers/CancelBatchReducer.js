import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'
//import {getBatchPlayersList} from "./AcademyReducer";

const initialState = {
    loading: false,
    batchdata: '',
    error: null,
};
export default function CancelBatchReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_CANCEL_BATCHES:
            return { ...state, loading: true };
        case types.DO_CANCEL_BATCHES_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, batchdata: action.payload.data };
        case types.DO_CANCEL_BATCHES_FAIL:
            console.log("fails", action.payload);
            return {

                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            //  console.log("fails",action.payload);
            return state;
    }
}



export function getBatchOperational(header, postdata) {
    console.log("postdata", header, postdata)
    return {
        type: types.GET_CANCEL_BATCHES,
        payload: {
            request: {
                url: `batch/operational`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}


export function cancelBatch(header, postdata) {
    console.log("postdata", header, postdata)
    return {
        type: types.GET_CANCEL_BATCHES,
        payload: {
            request: {
                url: `batch/cancellation`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getCoachBatchAttendenceDetails(header, batch_id, date) {
    console.log("postdata", header, batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `batch/${batch_id}/attendance-detail?attendance_date=${date}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}
