import * as types from '../../actions/actionTypes';

const initialState = {
  loading: false,
  data: '',
  error: null,
};
export default function TrialSessionReducer(state = initialState, action) {
  switch (action.type) {
    case types.TRIAL_SESSION:
      return { ...state, loading: true };
    case types.TRIAL_SESSION_SUCCESS:
      console.log("sucesss DO_TRIAL_SESSION_SUCCESS", action.payload.data);
      return { ...state, loading: false, data: action.payload.data };
    case types.TRIAL_SESSION_FAIL:
      console.log("fails TRIAL_SESSION_FAIL", action.payload);
      return {
        ...state,
        loading: false,
        error: 'Error while fetching user'
      };
    default:
      return state;
  }
}

export function saveTrialSessionData(postData) {
  console.log(' data => ', postData)
  return {
    type: types.TRIAL_SESSION,
    payload: {
      request: {
        url: `global/machaxi-trial-session`,
        method: 'POST',
        data: postData,
      }
    }
  };

}