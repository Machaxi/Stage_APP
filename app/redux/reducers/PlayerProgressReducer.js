import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'
//import {getBatchPlayersList} from "./AcademyReducer";

const initialState = {
    loading: false,
    performencedata: '',
    error: null,
};
export default function PlayerProgressReducer(state = initialState, action) {
    switch (action.type) {
        case types.PLAYER_PROGRESS:
            return { ...state, loading: true };
        case types.PLAYER_PROGRESS_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, progressdata: action.payload.data };
        case types.PLAYER_PROGRESS_FAIL:
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

export function getPlayerProgress(header, batch_id, player_id) {
    console.log("postdata getCoachBatch", header, batch_id, player_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    // `performance/dues?academy_id=${academy_id}&coach_id=${coach_id}`,
    return {
        type: types.PLAYER_PROGRESS,
        payload: {
            request: {
                url: `performance/update-player-form-session?player_id=${player_id}&batch_id=${batch_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}



// export function getPerformenceOption(header, batch_id, player_id, month, year) {
//     console.log("getPerformenceOption", header, batch_id, player_id, month, year)
//     // var header =
//     //     getData('header', (value) => {
//     //         header  = value
//     //     });
//     return {
//         type: types.GET_PERFORMENCE,
//         payload: {
//             request: {
//                 url: `performance/update-player-form?player_id=${player_id}&batch_id=${batch_id}&month=${month}&year=${year}`,
//                 method: 'GET',
//                 // data: postdata,
//                 headers: {
//                     'x-authorization': header

//                 },
//             }
//         }
//     };

// }


export function savePlayerProgress(header, postdata) {
    console.log("postdata", header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.PLAYER_PROGRESS,
        payload: {
            request: {
                url: `performance/save-session`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

// export function savePlayerPerformance(header, postData) {
//     return {
//         type: types.GET_BATCHES,
//         payload: {
//             request: {
//                 url: `performance/save`,
//                 method: 'POST',
//                 data: postData,
//                 headers: {
//                     'x-authorization': header

//                 },
//             }
//         }
//     };

// }

