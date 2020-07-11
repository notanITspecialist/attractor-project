import axiosApi from "../../axiosAPI";
import {push} from "connected-react-router";

export const ADD_CATEGORY_REQ = 'ADD_CATEGORY_REQ';
export const ADD_CATEGORY_RES = 'ADD_CATEGORY_RES';
export const ADD_CATEGORY_ERR = 'ADD_CATEGORY_ERR';

export const GET_CATEGORY_REQ = 'GET_CATEGORY_REQ';
export const GET_CATEGORY_RES = 'GET_CATEGORY_RES';
export const GET_CATEGORY_ERR = 'GET_CATEGORY_ERR';

export const GET_CATEGORIES_REQ = 'GET_CATEGORIES_REQ';
export const GET_CATEGORIES_RES = 'GET_CATEGORIES_RES';
export const GET_CATEGORIES_ERR = 'GET_CATEGORIES_ERR';

export const EDIT_CATEGORY_REQ = 'EDIT_CATEGORY_REQ';
export const EDIT_CATEGORY_RES = 'EDIT_CATEGORY_RES';
export const EDIT_CATEGORY_ERR = 'EDIT_CATEGORY_ERR';


const addCategoryReq = () => ({type: ADD_CATEGORY_REQ});
const addCategoryRes = data => ({type: ADD_CATEGORY_RES, data});
const addCategoryErr = error => ({type: ADD_CATEGORY_ERR, error});

const getCategoryReq = () => ({type: GET_CATEGORY_REQ});
const getCategoryRes = data => ({type: GET_CATEGORY_RES, data});
const getCategoryErr = error => ({type: GET_CATEGORY_ERR, error});

const getCategoriesReq = () => ({type: GET_CATEGORIES_REQ});
const getCategoriesRes = data => ({type: GET_CATEGORIES_RES, data});
const getCategoriesErr = error => ({type: GET_CATEGORIES_ERR, error});

const editCategoryReq = () => ({type: EDIT_CATEGORY_REQ});
const editCategoryRes = data => ({type: EDIT_CATEGORY_RES, data});
const editCategoryErr = error => ({type: EDIT_CATEGORY_ERR, error});

export const deleteCategory = id => async dispatch => {
    await axiosApi.delete('/category/'+id);

    dispatch(getCategories());
};

export const addCategory = category => async dispatch => {
    try {
        dispatch(addCategoryReq());

        const data = await axiosApi.post('/category', category);

        dispatch(addCategoryRes(data.data))

        dispatch(push('/categoriesList'))
    } catch (e) {
        dispatch(addCategoryErr(e))
    }
};

export const getCategory = id => async dispatch => {
    try {
        dispatch(getCategoryReq());

        const data = await axiosApi.get('/category/' + id);

        dispatch(getCategoryRes(data.data))
    } catch (e) {
        dispatch(getCategoryErr(e))
    }
};

export const getCategories = category => async dispatch => {
    try {
        dispatch(getCategoriesReq());

        const data = await axiosApi.get('/category', category);

        dispatch(getCategoriesRes(data.data))
    } catch (e) {
        dispatch(getCategoriesErr(e))
    }
};

export const editCategory = (id, category) => async dispatch => {
    try {
        dispatch(editCategoryReq())

        const data = await axiosApi.put('/category/'+id , category);

        dispatch(editCategoryRes(data.data))
        dispatch(getCategoryRes({}))

        dispatch(push('/categoriesList'))
    } catch (e) {
        dispatch(editCategoryErr())
    }
};