import * as types from '../../actions/actionTypes';
import {getData,storeData} from '../../components/auth'

const initialState = {
    loading: false,
    switherlist: '',
    error: null,
};
export default function switchReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_SWITCHING:
            return { ...state, loading: true };
        case types.DO_SWITCHING_SUCCESS:
            console.log("sucesss",action.payload.data);
            return { ...state, loading: false, switherlist: action.payload.data };
        case types.DO_SWITCHING_FAIL:
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

export function getPlayerSWitcher(header) {
    console.log("postdata",header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_SWITCHING,
        payload: {
            request: {
                url: `player/switcher`,
                method: 'GET',
               // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getCoachSWitcher(header) {
    console.log("postdata",header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_SWITCHING,
        payload: {
            request: {
                url: `coach/switcher`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}
