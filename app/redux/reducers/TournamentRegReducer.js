import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function TournamentRegReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_TOURNAMENT_REGISTER:
            return { ...state, loading: true };
        case types.DO_TOURNAMENT_REGISTER_SUCCESS:
            console.log("sucesss DO_TOURNAMENT_REGISTER_SUCCESS", action.payload.data);
            console.warn('header ', JSON.stringify(action.payload.headers))
            if (action.payload.headers['x-authorization']) {
                console.log("sucesss Paly")
                storeData('header', action.payload.headers['x-authorization']);
            }
            return { ...state, loading: false, data: action.payload.data };

        case types.DO_TOURNAMENT_REGISTER_FAIL:
            console.log("fails DO_TOURNAMENT_REGISTER_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}



export function tournamentLogin(data) {
    console.log("tournamentLogin", data)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_TOURNAMENT_REGISTER,
        payload: {
            request: {
                url: `global/tournament-login`,
                method: 'POST',
                data: data,
            }
        }
    };
}
