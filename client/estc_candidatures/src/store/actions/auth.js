import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkLoginTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (username, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            username: username,
            password: password,
            returnSecureToken: true
        };

        axios.post('http://127.0.0.1:8000/api/token/', authData).then(res => {
            console.log(res.data);
            dispatch(authSuccess(res.data.token, res.data.user_id));
            dispatch(checkLoginTimeout(res.data.expiresIn));
        }).catch(err => {
            const error = "The username or password is uncorrect";
            dispatch(authFail(error));
        })
    }
}