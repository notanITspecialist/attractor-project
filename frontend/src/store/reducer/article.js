import {
    GET_ARTICLE_ERR,
    GET_ARTICLE_REQ,
    GET_ARTICLE_RES,

    GET_ARTICLES_ERR,
    GET_ARTICLES_REQ,
    GET_ARTICLES_RES
} from "../actions/article";

const initialState = {
    loading: false,
    article: {},
    articles: [],
    error: ''
};

const article = (state = initialState, action) => {
    switch (action.type) {
        case GET_ARTICLE_REQ:
            return {...state, loading: true};
        case GET_ARTICLE_RES:
            return {...state, article: action.data, loading: false};
        case GET_ARTICLE_ERR:
            return {...state, error: action.error, loading: false};

        case GET_ARTICLES_REQ:
            return {...state, loading: true};
        case GET_ARTICLES_RES:
            return {...state, articles: action.data, loading: false};
        case GET_ARTICLES_ERR:
            return {...state, error: action.error, loading: false};

        default:
            return state
    }
};

export default article;