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


// export function getAllAcademy(query, job_vacancy) {
//     console.log('getAllAcademy => ', query)
//     let url = `global/academy/all?${query}`
//     if (job_vacancy) {
//         url = `global/academy/all?vacancy=1&${query}`
//     }
//     return {
//         type: types.DO_LOGIN,
//         payload: {
//             request: {
//                 url: url
//             }
//         }
//     };



// }

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

export function getCoachFeedbackList(header, academy_id, coach_id, page, size, sort, type) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/feedback/getByAcademyCoach?academy_id=${academy_id}&coach_id=${coach_id}&page=${page}&size=${size}&sort=${sort},${type}`,
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
        type: types.GET_PLAYER_LISTING,
        payload: {
            request: {
                url: `global/academy/${id}/players`
            }
        }
    };
}

// export function search(search_query, locality_id) {

//     let url = `global/academy/search?search_query=${search_query}&locality_id=${locality_id}`
//     console.log("search => " + url)
//     return {
//         type: types.DO_LOGIN,
//         payload: {
//             request: {
//                 url: url
//             }
//         }
//     }
// };

// export function search_auto_suggest(search_query) {

//     let url = `global/academy/search-auto-suggest?search_query=${search_query}`
//     console.log("search => " + url)
//     return {
//         type: types.DO_LOGIN,
//         payload: {
//             request: {
//                 url: url
//             }
//         }
//     }
// };


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

export function coachDetail(header, coach_id, academy_id) {

    let url = `global/coach/details?coach_id=${coach_id}&academy_id=${academy_id}`
    console.log("coachDetail=> " + url)
    return {
        type: types.DO_LOGIN,
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

export function getBatchPlayersList(header, batch_id) {
    console.log("getBatchPlayersList", header, batch_id)
    // var header =
    //     getData('header', (value) => {
    //         header  = value
    //     });
    return {
        type: types.GET_PLAYER_LISTING,
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

export function getAcademyBatchDetail(academy_id, proficiency, rating, availability, timing, sports) {

    console.log('availability', availability);

    let url=`global/academy/batches?academy_id=${academy_id}`;
    
    if(proficiency!="")
        url+=`&proficiency=${proficiency}`;

    if(rating!="")
        url+=`&coachRatings=${rating}`;

    if(availability!="")
        url+=`&is_available=${availability}`;

    if(timing!="")
        url+=`&timing=${timing}`;

    if(sports!="")
        url+=`&sports=${sports}`;
    
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: url
            }
        }
    };

}

export function bookTrial(header, data) {

    // var url;
    // if (user_id != null) {
    //     url = `global/book-trial`
    // } else {
    //     url = `batch/${batchId}/book-trial?academy_id=${academy_id}&name=${name}&contact=${contact}`
    // }
    console.log('bookTrial=>',JSON.stringify(data))
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `global/book-trial`,
                method: 'POST',
                data: data,
                headers: {
                    'x-authorization': header
                },
            }
        }
    }
};
