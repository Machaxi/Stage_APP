import * as types from '../../actions/actionTypes';
import { getData, storeData } from '../../components/auth'

const initialState = {
    loading: false,
    profileData: '',
    error: null,
};
export default function DietPlanReducer(state = initialState, action) {
    switch (action.type) {
        case types.DIET_PLAN:
            return { ...state, loading: true };
        case types.DO_DIET_PLAN_SUCCESS:
            console.log("sucesss DO_DIET_PLAN_SUCCESS", action.payload.data);
            return { ...state, loading: false, profileData: action.payload.data };
        case types.DO_DIET_PLAN_FAIL:
            console.log("fails DO_DIET_PLAN_FAIL", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function dietPlan(header, player_id,academy_id ) {
    console.log("dietPlan ", header, )
  
    return {
        type: types.DIET_PLAN,
        payload: {
            request: {
                url: `player/diet?player_id=${player_id}&academy_id=${academy_id}`,
                method: 'GET',
                headers: {
                    'x-authorization': header,
                },
            }
        }
    };

}
