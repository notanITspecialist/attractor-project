import {
    GET_CATEGORIES_ERR,
    GET_CATEGORIES_REQ,
    GET_CATEGORIES_RES,

    GET_CATEGORY_ERR,
    GET_CATEGORY_REQ,
    GET_CATEGORY_RES
} from "../actions/category";

const initialState = {
    loading: false,
    categories: [],
    category: {},
    error: ''
};

const category = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_REQ:
            return {...state, loading: true};
        case GET_CATEGORY_RES:
            return {...state, category: action.data, loading: false};
        case GET_CATEGORY_ERR:
            return {...state, error: action.error, loading: false};

        case GET_CATEGORIES_REQ:
            return {...state, loading: true};
        case GET_CATEGORIES_RES:
            return {...state, categories: action.data, loading: false};
        case GET_CATEGORIES_ERR:
            return {...state, error: action.error, loading: false};

        default:
            return state
    }
};

export default category;
