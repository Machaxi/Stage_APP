import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    res: '',
    error: null,
};
export default function PlayerReducer(state = initialState, action) {
    switch (action.type) {

        case types.GET_PLAYER_LISTING:
            return { ...state, loading: true };
        case types.DO_PLAYER_LISTING_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, res: action.payload.data };
        case types.DO_PLAYER_LISTING_FAIL:
            console.log("fails", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };

        default:
            return state;
    }
}

export function getAcademyPlayersList(id) {
    return {
        type: types.GET_PLAYER_LISTING,
        payload: {
            request: {
                url: `global/academy/${id}/players`
            }
        }
    };
}





export function getBatchPlayersList(header, batch_id) {
    console.log("getBatchPlayersList", header, batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PLAYER_LISTING,
        payload: {
            request: {
                url: `batch/${batch_id}/players`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

