import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    profileData: '',
    error: null,
};
export default function ProfileReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_PROFILE:
            return { ...state, loading: true };
        case types.DO_PROFILE_SUCCESS:
            console.log("sucesss PROFILE", action.payload.data);
            return { ...state, loading: false, profileData: action.payload.data };
        case types.DO_PROFILE_FAIL:
            console.log("fails GET_PROFILE", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function saveUserStartupProfile(header, postdata) {
    console.log("saveUserStartupProfile ", header, postdata)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PROFILE,
        payload: {
            request: {
                url: `user/profile`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'multipart/form-data; charset=utf-8; ',
                    
                },
            }
        }
    };
    // let options = {
    //     headers: {
    //         'x-authorization': header,
    //         'Content-Type': 'multipart/form-data',
    //     },
    //     method: 'POST'
    // };

    // options.body =postdata

    // return fetch("http://13.233.124.189:8080/api/user/profile", options)
    //     .then(response => {
    //         return response.json()
    //             .then(responseJson => {
    //                 //You put some checks here
    //                 console.warn('Response ',responseJson)
    //                 return responseJson;
    //             });
    //     });


}

export function saveOtherUserProfile(header, postdata) {
    console.log("saveOtherUserProfile ", header, postdata)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PROFILE,
        payload: {
            request: {
                url: `user/profile`,
                method: 'POST',
                data: postdata,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };
}

export function getRelationsDetails(header) {
    console.log("getRelationsDetails ", header)

    return {
        type: types.GET_PROFILE,
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
