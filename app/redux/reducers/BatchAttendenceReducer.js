import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'
//import {getBatchPlayersList} from "./AcademyReducer";

const initialState = {
    loading: false,
    batchdata: '',
    error: null,
};
export default function BatchAttendenceReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_BATCHES_ATTENDENCE:
            return { ...state, loading: true };
        case types.DO_BATCHES_ATTENDENCE_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, batchdata: action.payload.data };
        case types.DO_BATCHES_ATTENDENCE_FAIL:
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


export function getCoachBatchAttendenceDetails(header, batch_id, date) {
    console.log("postdata", header, batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES_ATTENDENCE,
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
