import * as types from '../../actions/actionTypes';

const initialState = {
  loading: false,
  res: '',
  error: null,
};
export default function CourtBookingReducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_BOOKING:
      return { ...state, loading: true };
    case types.DO_BOOKING_SUCCESS:
      console.log("sucesss DO_BOOKING_SUCCESS", action.payload.data);
      return { ...state, loading: false, res: action.payload.data };
    case types.DO_BOOKING_FAIL:
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

export function getCourtBookingDetails(header, academy_id, date, sportsId) {

  var url;
  if (sportsId == null) {
    url = `global/court/details?academy_id=${academy_id}&date=${date}`
  } else {
    url = `global/court/details?academy_id=${academy_id}&date=${date}&sport_id=${sportsId}`
  }
  return {
    type: types.GET_BOOKING,
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

export function createBooking(header, postData) {
  return {
    type: types.GET_BOOKING,
    payload: {
      request: {
        url: 'court/mybookings',
        method: 'POST',
        data: postData,
        headers: {
          'x-authorization': header

        },
      }
    }
  }
};

export function getCourtBookings(header) {
  return {
    type: types.GET_BOOKING,
    payload: {
      request: {
        url: 'court/mybookings',
        method: 'GET',
        headers: {
          'x-authorization': header
        },
      }
    }
  }
};