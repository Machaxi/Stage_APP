import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    res: '',
    error: null,
};
export default function BrowseAcademyReducer(state = initialState, action) {
    switch (action.type) {
        case types.GET_BROWSE_ACADEMY:
            return { ...state, loading: true };
        case types.DO_BROWSE_ACADEMY_SUCCESS:
            console.log("sucesss", action.payload.data);
            return { ...state, loading: false, res: action.payload.data };
        case types.DO_BROWSE_ACADEMY_FAIL:
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


export function getAllAcademy(query, job_vacancy,book_court) {
    console.log('getAllAcademy => ', query)
    let url = `global/academy/all?${query}`
    if (job_vacancy) {
        url = `global/academy/all?vacancy=1&${query}`
    }else if(book_court){
        url = `global/academy/all?book_and_play=1&${query}`
    }
    return {
        type: types.GET_BROWSE_ACADEMY,
        payload: {
            request: {
                url: url
            }
        }
    };



}


export function search(search_query, locality_id) {

    let url = `global/academy/search?search_query=${search_query}&locality_id=${locality_id}`
    console.log("search => " + url)
    return {
        type: types.GET_BROWSE_ACADEMY,
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
        type: types.GET_BROWSE_ACADEMY,
        payload: {
            request: {
                url: url
            }
        }
    }
};
