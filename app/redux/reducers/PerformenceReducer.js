import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'
//import {getBatchPlayersList} from "./AcademyReducer";

const initialState = {
    loading: false,
    performencedata: '',
    error: null,
};
export default function PerformenceReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_PERFORMENCE:
            return { ...state, loading: true };
        case types.DO_PERFORMENCE_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, performencedata: action.payload.data };
        case types.DO_PERFORMENCE_FAIL:
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

export function getCoachPerformenceList(header, academy_id, coach_id) {
    console.log("postdata getCoachBatch", header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PERFORMENCE,
        payload: {
            request: {
                url: `performance/dues?academy_id=${academy_id}&coach_id=${coach_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getPerformenceDuePlayer(header, batch_id, month, year) {
    console.log("postdata", header, batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PERFORMENCE,
        payload: {
            request: {
                url: `performance/batch-monthly-due?batch_id=${batch_id}&month=${month}&year=${year}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}


export function getPerformenceOption(header, batch_id, player_id, month, year) {
    console.log("getPerformenceOption", header, batch_id, player_id, month, year)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PERFORMENCE,
        payload: {
            request: {
                url: `performance/update-player-form?player_id=${player_id}&batch_id=${batch_id}&month=${month}&year=${year}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getCoachBatchAttendence(header, batch_id) {
    console.log("postdata", header, batch_id)
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

export function saveCoachBatchAttendence(header, batch_id, postdata) {
    console.log("postdata", header, batch_id)
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

export function savePlayerPerformance(header, postData) {
    return {
        type: types.GET_BATCHES,
        payload: {
            request: {
                url: `performance/save`,
                method: 'POST',
                data: postData,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getPlayerPerformance(header, attributeId, month, year, batchId, playerId, parameterId) {

    let url;

    if(parameterId==null) {
        url = `performance/${attributeId}/attribute-detail?month=${month}&year=${year}&batch_id=${batchId}&player_id=${playerId}`
    } else {
        url = `performance/${attributeId}/attribute-detail?month=${month}&year=${year}&batch_id=${batchId}&player_id=${playerId}&parameterId=${parameterId}`
    }

    return {
        type: types.GET_PERFORMENCE,
        payload: {
            request: {
                url: url,
                method: 'GET',
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}
