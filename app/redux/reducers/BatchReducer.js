import * as types from '../../actions/actionTypes';
import {getData,storeData} from '../../components/auth'
//import {getBatchPlayersList} from "./AcademyReducer";

const initialState = {
    loading: false,
    batchdata: '',
    error: null,
};
export default function BatchReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_BATCHES:
            return { ...state, loading: true };
        case types.DO_BATCHES_SUCCESS:
            console.log("sucesss",action.payload.data);
            return { ...state, loading: false, batchdata: action.payload.data };
        case types.DO_BATCHES_FAIL:
            console.log("fails",action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getCoachBatch(header,academy_id,coach_id) {
    console.log("postdata getCoachBatch",header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `coach/batches?academy_id=${academy_id}&coach_id=${coach_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getCoachBatchDetails(header,batch_id) {
    console.log("postdata",header,batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `coach/batch/${batch_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getCoachBatchAttendence(header,batch_id) {
    console.log("postdata",header,batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `batch/${batch_id}/attendance`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function saveCoachBatchAttendence(header,batch_id,postdata) {
    console.log("postdata",header,batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `batch/${batch_id}/attendance`,
                method: 'POST',
                 data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}


export function getCoachBatchAttendenceDetails(header,batch_id) {
    console.log("postdata",header,batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `batch/${batch_id}/attendance-detail`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}
