import {
    GET_USER_ERR,
    GET_USER_REQ,
    GET_USER_RES,

    GET_USERS_ERR,
    GET_USERS_REQ,
    GET_USERS_RES,

    LOGIN_USER_ERR,
    LOGIN_USER_REQ,
    LOGIN_USER_RES, LOGOUT_USER_ERR, LOGOUT_USER_REQ, LOGOUT_USER_RES,

    REG_USER_ERR,
    REG_USER_REQ,
    REG_USER_RES
} from "../actions/user";

const initialState = {
    user: {},
    users: [],
    editUser: {},
    loading: false,
    error: ''
};

const user = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS_REQ:
            return {...state, loading: true};
        case GET_USERS_RES:
            return {...state, users: action.data, loading: false};
        case GET_USERS_ERR:
            return {...state, error: action.error, loading: false};

        case GET_USER_REQ:
            return {...state, loading: true};
        case GET_USER_RES:
            return {...state, editUser: action.data, loading: false};
        case GET_USER_ERR:
            return {...state, error: action.error, loading: false};

        case REG_USER_REQ:
            return {...state, loading: true};
        case REG_USER_RES:
            return {...state, user: action.data, loading: false};
        case REG_USER_ERR:
            return {...state, error: action.error, loading: false};

        case LOGIN_USER_REQ:
            return {...state, loading: true};
        case LOGIN_USER_RES:
            return {...state, user: action.data, loading: false};
        case LOGIN_USER_ERR:
            return {...state, error: action.error, loading: false};

        case LOGOUT_USER_REQ:
            return {...state, loading: true};
        case LOGOUT_USER_RES:
            return {...state, user: {}, loading: false};
        case LOGOUT_USER_ERR:
            return {...state, error: action.error, loading: false}

        default:
            return state
    }
};

export default user;