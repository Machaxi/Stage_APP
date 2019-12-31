import * as types from '../../actions/actionTypes';

const initialState = {
  loading: false,
  res: '',
  error: null,
};
export default function CompensatoryBatchReducer(state = initialState, action) {
  switch (action.type) {
    case types.COPENSATORY_BATCH:
      return { ...state, loading: true };
    case types.COPENSATORY_BATCH_SUCCESS:
      console.log("sucesss COPENSATORY_BATCH_SUCCESS", action.payload.data);
      return { ...state, loading: false, res: action.payload.data };
    case types.COPENSATORY_BATCH_FAIL:
      console.log("fails DO_BOOKING_FAIL", action.payload);
      return {
        ...state,
        loading: false,
        error: 'Error while fetching booking'
      };
    default:
      return state;
  }
}

export function getCompensatoryPlayers(header, player_name, batch_id) {
    var  url = `player/Compensatory-attendance/search?player_name=${player_name}&batch_id=${batch_id}`
    return {
      type: types.COPENSATORY_BATCH,
      payload: {
        request: {
          url: url,
          method: 'GET',
          headers: {
            'x-authorization': header
  
          },
        }
      }
    }
  };