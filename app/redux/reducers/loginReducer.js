import * as types from '../../actions/actionTypes';

const initialState = {
    loading: false,
    user: '',
    error: null,
};
export default function loginReducer(state = initialState, action) {
    switch (action.type) {
        case types.DO_LOGIN:
            return { ...state, loading: true };
        case types.DO_LOGIN_SUCCESS:
            console.log("sucesss",action.payload.data);
            return { ...state, loading: false, user: action.payload.data };
        case types.DO_LOGIN_FAIL:
           // console.log("fails",action.payload.data);
            return {
                ...state,
                loading: false,
                error: 'Error while fetching user'
            };
        default:
            return state;
    }
}

export function doLogin(email, password) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                url: `/customer/login/${email}/${password}`
            }
        }
    };

}
export function resetPassword(email,code,newpassword) {
    console.log("email",email);
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
//otpconfirm/email/niranjankr0@gmail.com/code/3090/password/123456789?email=&oauth_token=&version=4
                url: `/otpconfirm/email/${email}/code/${code}/password/${newpassword}?email=&oauth_token=&version=4`
            }
        }
    };

}
export function sendOTP(email) {
    console.log("email",email);
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {

                url: `/otpsend/email/${email}?email=&oauth_token=&version=4`
            }
        }
    };

}

export function doRegister(firstName, lastName, email, password) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                //customer/create/sallu@gmail.com?code=custom&email=&fname=salman&lname=khan&oauth_token=&password=123456789&
                url: `/customer/create/${email}?code=custom&email=${email}&fname=${firstName}&lname=${lastName}&password=${password}`
            }
        }
    };

}
export function doFBLogin(name, email, quote_id,timeNow,gcmid) {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                //customer/create/sallu@gmail.com?code=custom&email=&fname=salman&lname=khan&oauth_token=&password=123456789&
                url: `/customer/create/${email}?code=customlogin&email=${email}&name=${name}&quote_id=${quote_id}&timeNow=${timeNow}&gcmid=${gcmid}`
            }
        }
    };

}
export function doFBLoginAce() {
    return {
        type: types.DO_LOGIN,
        payload: {
            request: {
                //customer/create/sallu@gmail.com?code=custom&email=&fname=salman&lname=khan&oauth_token=&password=123456789&
                url: `/global/academy/all`
            }
        }
    };

}

