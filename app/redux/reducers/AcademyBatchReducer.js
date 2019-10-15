import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    res: '',
    error: null,
};
export default function AcademyBatchReducer(state = initialState, action) {
    switch (action.type) {
        case types.DO_ACADEMY_BATCH_START:
            return { ...state, loading: true };
        case types.DO_ACADEMY_BATCH_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, res: action.payload.data };
        case types.DO_ACADEMY_BATCH_FAIL:
            console.log("fails", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };

        default:
            return state;
    }
}


export function getAcademyBatchDetail(academy_id, proficiency, rating, availability) {

    console.log('availability', availability);

    let url;
    if (proficiency == '' && rating == '' && availability == '') {
        url = `global/academy/batches?academy_id=${academy_id}`;
    } else {
        if (proficiency == '' && rating == '') {
            url = `global/academy/batches?academy_id=${academy_id}&is_available=${availability}`;
        }
        else if (rating == '' && availability == '') {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}`;
        }
        else if (proficiency == '' && availability == '') {
            url = `global/academy/batches?academy_id=${academy_id}&coachRatings=${rating}`;
        }
        else if (proficiency == '') {
            url = `global/academy/batches?academy_id=${academy_id}&coachRatings=${rating}&is_available=${availability}`;
        }
        else if (rating == '') {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}&is_available=${availability}`;
        }
        else if (availability == '') {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}&coachRatings=${rating}`;
        }
        else {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}&coachRatings=${rating}&is_available=${availability}`;
        }
    }
    return {
        type: types.DO_ACADEMY_BATCH_START,
        payload: {
            request: {
                url: url
            }
        }
    };

}

