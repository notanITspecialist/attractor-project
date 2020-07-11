import axiosApi from "../../axiosAPI";
import {push} from "connected-react-router";

export const GET_ARTICLES_REQ = 'GET_ARTICLES_REQ';
export const GET_ARTICLES_RES = 'GET_ARTICLES_RES';
export const GET_ARTICLES_ERR = 'GET_ARTICLES_ERR';

export const GET_ARTICLE_REQ = 'GET_ARTICLE_REQ';
export const GET_ARTICLE_RES = 'GET_ARTICLE_RES';
export const GET_ARTICLE_ERR = 'GET_ARTICLE_ERR';

const getArticlesReq = () => ({type: GET_ARTICLES_REQ});
const getArticlesRes = data => ({type: GET_ARTICLES_RES, data});
const getArticlesErr = error => ({type: GET_ARTICLES_ERR, error});

const getArticleReq = () => ({type: GET_ARTICLE_REQ});
const getArticleRes = data => ({type: GET_ARTICLE_RES, data});
const getArticleErr = error => ({type: GET_ARTICLE_ERR, error});

export const deleteArticle = id => async dispatch => {
    await axiosApi.delete('/article/' + id);

    dispatch(getArticles());
};

export const editArticle = (id, article) => async dispatch => {
    await axiosApi.put('/article/' + id, article);

    dispatch(push('/articlesList'))
};

export const getArticle = id => async dispatch => {
    try {
        dispatch(getArticleReq());

        const data = await axiosApi.get('/article/' + id);

        dispatch(getArticleRes(data.data));
    } catch (e) {
        dispatch(getArticleErr(e))
    }
};

export const getArticles = category => async dispatch => {
    try {
        if(category !== undefined) {
            dispatch(getArticlesReq());

            const data = await axiosApi.get('/article?category='+category);

            return dispatch(getArticlesRes(data.data));
        }
        dispatch(getArticlesReq());

        const data = await axiosApi.get('/article');

        dispatch(getArticlesRes(data.data));
    } catch (e) {
        dispatch(getArticlesErr(e))
    }
};

export const addArticle = article => async dispatch => {
    await axiosApi.post('/article', article);

    dispatch(push('/articlesList'))
};