import * as types from './actionTypes';
import * as settings from '../config/settings';
import axios from 'axios';

export const doLogin = (email, password) => {
    return (dispatch, getState) => {

        dispatch({ type: types.DO_LOGIN_START })
        axios.get(settings.API_URL + '/login/${email}/${password}').then(function (response) {
            console.log(response)
            dispatch({ type: types.DO_LOGIN_SUCCESS, payload: response })

        }).catch(function (error) {
            dispatch({ type: types.DO_LOGIN_FAIL, payload: error })
        })
    }
    // console.log(email + password)
    // return {
    //     type: types.DO_LOGIN,
    //     payload: {
    //         request: {
    //             url: `/login/${email}/${password}`
    //         }
    //     }
    // };

}
export const logout = () => {
    return (dispatch, getState) => {
        dispatch({ type: types.LOGOUT });
    }
}
// export const loadEmployees = (user) => {

//     return (dispatch, getState) => {

//         dispatch({ type: GET_REPOS_START })
//         axios.get('https://breaking-bad-quotes.herokuapp.com/v1/quotes').then(function (response) {
//             console.log(response)
//             dispatch({ type: GET_REPOS_SUCCESS, payload: response })

//         }).catch(function (error) {
//             dispatch({ type: GET_REPOS_FAIL, payload: error })
//         })
//     }

// }

