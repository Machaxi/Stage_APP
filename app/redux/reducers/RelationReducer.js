import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    profileData: '',
    error: null,
};
export default function RelationReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_RELATION:
            return { ...state, loading: true };
        case types.DO_RELATION_SUCCESS:
            console.log("sucesss DO_RELATION_SUCCESS", action.payload.data);
            return { ...state, loading: false, profileData: action.payload.data };
        case types.DO_RELATION_FAIL:
            console.log("fails GET_DO_RELATION_FAILPROFILE", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}


export function getRelationsDetails(header) {
    console.log("getRelationsDetails ", header)

    return {
        type: types.GET_RELATION,
        payload: {
            request: {
                url: `user/relations`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}

export function logout(header) {
    console.log("logout ", header)

    return {
        type: types.GET_RELATION,
        payload: {
            request: {
                url: `logout`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}
