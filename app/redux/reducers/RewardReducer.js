import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    data: '',
    error: null,
};
export default function RewardReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_REWARD:
            return { ...state, loading: true };
        case types.DO_REWARD_SUCCESS:
            console.log("sucesss RewardReducer", action.payload.data);
            return { ...state, loading: false, data: action.payload.data };
        case types.DO_REWARD_FAIL:
            console.log("fails RewardReducer", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function getAcademyListing(header) {
    console.log("postdata", header)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_REWARD,
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

export function getRewardDue(header, academy_id, coach_id) {
    console.log("postdata", header)

    return {
        type: types.GET_REWARD,
        payload: {
            request: {
                url: `rewards/dues?academy_id=${academy_id}&coach_id=${coach_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}
export function getPlayerRewardDue(header, parent_player_id, academy_id) {
    console.log("postdata", header)

    return {
        type: types.GET_REWARD,
        payload: {
            request: {
                url: `rewards/players/dues?parent_player_id=${parent_player_id}&academy_id=${academy_id}`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}


export function getRewardMonthlyDue(header, academy_id, batch_id, month, year) {
    console.log("getRewardMonthlyDue", header, academy_id, batch_id, month, year)

    return {
        type: types.GET_REWARD,
        payload: {
            request: {
                url: `rewards/batch-monthly-due?academy_id=${academy_id}&batch_id=${batch_id}&month=${month}&year=${year}`,
                method: 'GET',
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

export function saveRewardData(header, req) {
    console.log("getRewardMonthlyDue", header, req)

    return {
        type: types.GET_REWARD,
        payload: {
            request: {
                url: `rewards/coach/save`,
                method: 'POST',
                data: req,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };

}

export function saveParentRewardData(header, req) {
    console.log("saveParentRewardData", header, req)

    return {
        type: types.GET_REWARD,
        payload: {
            request: {
                url: `rewards/family/save`,
                method: 'POST',
                data: req,
                headers: {
                    'x-authorization': header,
                    'Content-Type': 'application/json',
                },
            }
        }
    };

}