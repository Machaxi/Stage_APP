import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    res: '',
    error: null,
};
export default function AcademyReducer(state = initialState, action) {
    switch (action.type) {
        case types.DO_LOGIN:
            return { ...state, loading: true };
        case types.DO_LOGIN_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, res: action.payload.data };
        case types.DO_LOGIN_FAIL:
            console.log("fails", action.payload);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };

        case types.GET_COACH1:
            return { ...state, loading: true };
        case types.DO_COACH1_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, res: action.payload.data };
        case types.DO_COACH1_FAIL:
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


export function getAllAcademy() {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/academy/all`
            }
        }
    };



}

export function getAcademyDetail(id) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/academy/${id}`
            }
        }
    };
}

export function getAcademyFeedbackList(header, academy_id, page, size, sort, type) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/feedback/getByAcademy?academy_id=${academy_id}&page=${page}&size=${size}&sort=${sort},${type}`,
                method: 'GET',
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

export function getCoachFeedbackList(header, academy_id, coach_id, page, size, sort) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/feedback/getByAcademyCoach?academy_id=${academy_id}&coach_id=${coach_id}&page=${page}&size=${size}&sort=${sort}`,
                method: 'GET',
                headers: {
                    'x-authorization': header

                },
            }
        }
    };
}

export function getAcademyPlayersList(id) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/academy/${id}/players`
            }
        }
    };
}

export function search(search_query, locality_id) {

    let url = `global/academy/search?search_query=${search_query}&locality_id=${locality_id}`
    console.log("search => " + url)
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: url
            }
        }
    }
};

export function search_auto_suggest(search_query) {

    let url = `global/academy/search-auto-suggest?search_query=${search_query}`
    console.log("search => " + url)
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: url
            }
        }
    }
};


export function coachListing(academy_id) {

    console.log("coachListing => " + academy_id)
    return {
        type: types.GET_COACH1,
        payload: {
            request: {
                url: `global/coach/list?academy_id=${academy_id}`
            }
        }
    }
};

export function coachDetail(coach_id) {

    let url = `global/coach/details?coach_id=${coach_id}`
    console.log("search => " + url)
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: url
            }
        }
    }
};

export function getBatchPlayersList(header, batch_id) {
    console.log("getBatchPlayersList", header, batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `batch/${batch_id}/players`,
                method: 'GET',
                // data: postdata,
                headers: {
                    'x-authorization': header

                },
            }
        }
    };

}

export function getAcademyBatchDetail(academy_id, proficiency, rating, availability) {

    console.log('availability',availability);

    let url;
    if(proficiency=='' && rating=='' && availability=='') {
        url = `global/academy/batches?academy_id=${academy_id}`;
    } else {
        if(proficiency=='' && rating=='') {
            url = `global/academy/batches?academy_id=${academy_id}&is_available=${availability}`;
        }
        else if(rating=='' && availability=='') {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}`;
        }
        else if(proficiency=='' && availability=='') {
            url = `global/academy/batches?academy_id=${academy_id}&coachRatings=${rating}`;
        }
        else if (proficiency=='') {
            url = `global/academy/batches?academy_id=${academy_id}&coachRatings=${rating}&is_available=${availability}`;
        }
        else if(rating=='') {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}&is_available=${availability}`;
        }
        else if(availability=='') {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}&coachRatings=${rating}`;
        }
        else {
            url = `global/academy/batches?academy_id=${academy_id}&proficiency=${proficiency}&coachRatings=${rating}&is_available=${availability}`;
        }
    }
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: url
            }
        }
    };

}
