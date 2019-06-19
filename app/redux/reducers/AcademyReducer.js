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


export function coachListing() {

    let url = `global/coach/list`
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

export function coachDetail() {

    let url = `global/coach/details`
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