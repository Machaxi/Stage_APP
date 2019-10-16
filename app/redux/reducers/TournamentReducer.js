import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function TournamentReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_TOURNAMENT:
            return { ...state, loading: true };
        case types.DO_TOURNAMENT_SUCCESS:
            console.log("sucesss DO_TOURNAMENT_SUCCESS", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_TOURNAMENT_FAIL:
            console.log("fails DO_TOURNAMENT_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getUpcomingTournament(header) {
    console.log("getUpcomingTournament", header)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `global/tournament/upcoming`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getRegisteredTournament(header, filter) {
    console.log("getRegisteredTournament", header, filter)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `tournament/registered?${filter}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getTournamentFixture(header, tournament_id) {
    console.log("getTournamentFixture", header, tournament_id)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `tournament/${tournament_id}/fixtures`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getPartnerList(header, tournament_id, page, size) {
    console.log("getPartnerList", header, tournament_id, page, size)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `tournament/partner-list?tournament_id=${tournament_id}&page=${page}&size=${size}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };

}

export function getTournamentResultListing(header, filter) {
    console.log("getTournamentResultListing", header, filter)

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `global/tournament/results?${filter}`,
                method: 'GET',
                headers: {
                    'x-authorization': header
                },
            }
        }
    };
}


export function registerTournament(header, postdata, is_edit_mode) {
    console.log("registerTournament", header)
    console.log('Request ', JSON.stringify(postdata))

    let url = 'tournament/register'
    if (is_edit_mode) {
        url = 'tournament/update-registration'
    }

    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: url,
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

export function getPlayerSWitcher(header, tournament_id) {
    console.log("getPlayerSWitcher", header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_TOURNAMENT,
        payload: {
            request: {
                url: `tournament/player-switcher?tournament_id=${tournament_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

// export function tournamentLogin(data) {
//     console.log("tournamentLogin", data)
//     // var header =
//     //     getData('header', (value) => {
//     //         header  = value
//     //     });
//     return {
//         type: types.GET_TOURNAMENT,
//         payload: {
//             request: {
//                 url: `global/tournament-login`,
//                 method: 'POST',
//                 data: data,
//             }
//         }
//     };
// }
