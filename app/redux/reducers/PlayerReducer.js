import * as types from "../../actions/actionTypes";

const initialState = {
  loading: false,
  res: "",
  error: null,
  booktrail: null,
  bookFail: null,
  playdata: null,
  planData: null,
};
export default function PlayerReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_PLAYER_LISTING:
      return { ...state, loading: true };
    case types.DO_PLAYER_LISTING_SUCCESS:
      console.log("sucesss", action.payload.data);
      return { ...state, loading: false, res: action.payload.data };
    case types.BOOK_COUCH_TRAIL_SUCCESS:
      return {
        ...state,
        booktrail: action.payload.data,
        bookFail: action.payload.response,
      };
    case types.BOOK_PLAY_TRAIL_SUCCESS:
      return {
        ...state,
        playdata: action.payload.data,
        bookFail: action.payload.response,
      };
    case types.SELECT_PLAN_SUCCESS:
      return { ...state, planData: action.payload.data };
    case types.DO_PLAYER_LISTING_FAIL:
      console.log("fails", action.payload);
      return {
        ...state,
        loading: false,
        error: "Error while fetching user",
      };

    default:
      return state;
  }
}

export function getAcademyPlayersList(id, header) {
  return {
    type: types.GET_PLAYER_LISTING,
    payload: {
      request: {
        url: `global/academy/${id}/players`,
        headers: {
          "x-authorization": header,
        },
      },
    },
  };
}

export function confirmCoachTrail(postdata, header, url) {
  return {
    type: types.BOOK_COUCH_TRAIL,
    payload: {
      request: {
        url: url,
        method: "POST",
        data: postdata,
        headers: {
          "x-authorization": header,
        },
      },
    },
  };
}

export function confirmPlayingTrail(postdata, header, url) {
  return {
    type: types.BOOK_PLAY_TRAIL,
    payload: {
      request: {
        url: url,
        method: "POST",
        data: postdata,
        headers: {
          "x-authorization": header,
        },
      },
    },
  };
}

export function selectPlanDate(postdata, header) {
  return {
    type: types.SELECT_PLAN,
    payload: {
      request: {
        url: `batch/player/select-coaching-plan`,
        method: "POST",
        data: postdata,
        headers: {
          "x-authorization": header,
        },
      },
    },
  };
}

export function getBatchPlayersList(header, batch_id) {
  console.log("getBatchPlayersList", header, batch_id);
  // var header =
  //     getData('header', (value) => {
  //         header  = value
  //     });
  return {
    type: types.GET_PLAYER_LISTING,
    payload: {
      request: {
        url: `batch/${batch_id}/players`,
        method: "GET",
        // data: postdata,
        headers: {
          "x-authorization": header,
        },
      },
    },
  };
}
