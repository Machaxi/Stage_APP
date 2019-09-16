import * as types from '../../actions/actionTypes';
import {getData,storeData} from '../../components/auth'

const initialState = {
    loading: false,
    dashboardData: '',
    error: null,
};
export default function dashboardReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_DASHBOARD:
            return { ...state, loading: true };
        case types.DO_DASHBOARD_SUCCESS:
            console.log("sucesss DASHBOARD",action.payload.data);
            return { ...state, loading: false, dashboardData: action.payload.data };
        case types.DO_DASHBOARD_FAIL:
            console.log("fails DO_DASHBOARD_FAIL",action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getPlayerDashboard(header,player_id,academy_id) {
    console.log("getPlayerDashboard ",header,player_id,academy_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_DASHBOARD,
        payload: {
            request: {
                url: `player/academic-profile?player_id=${player_id}&academy_id=${academy_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

export function getOtherPlayerDashboard(academy_id,player_id) {
    console.log("getPlayerDashboard ",player_id,academy_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_DASHBOARD,
        payload: {
            request: {
                url: `global/player/academic-profile?player_id=${player_id}&academy_id=${academy_id}`,
                method: 'GET',
                // data: postdata,
            }
        }
    };
}

export function getOtherPlayerWithoutAcademy(header,player_id) {
    console.log("getOtherPlayerWithoutAcademy ",player_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_DASHBOARD,
        payload: {
            request: {
                url: `global/user/user-profile?user_id=${player_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

export function getCoachDashboard(header,coach_id,academy_id) {
    console.log("getCoachDashboard",header,coach_id,academy_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_DASHBOARD,
        payload: {
            request: {
                url: `coach/academic-profile?coach_id=${coach_id}&academy_id=${academy_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getPlayerSWitcher(header) {
    console.log("postdata",header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_DASHBOARD,
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