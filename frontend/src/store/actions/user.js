import {push} from 'connected-react-router';
import axiosApi from "../../axiosAPI";

export const GET_USERS_REQ = 'GET_USERS_REQ';
export const GET_USERS_RES = 'GET_USERS_RES';
export const GET_USERS_ERR = 'GET_USERS_ERR';

export const GET_USER_REQ = 'GET_USER_REQ';
export const GET_USER_RES = 'GET_USER_RES';
export const GET_USER_ERR = 'GET_USER_ERR';

export const REG_USER_REQ = 'REQ_USER_REQ';
export const REG_USER_RES = 'REQ_USER_RES';
export const REG_USER_ERR = 'REG_USER_ERR';

export const LOGIN_USER_REQ = 'LOGIN_USER_REQ';
export const LOGIN_USER_RES = 'LOGIN_USER_RES';
export const LOGIN_USER_ERR = 'LOGIN_USER_ERR';

export const LOGOUT_USER_REQ = 'LOGOUT_USER_REQ';
export const LOGOUT_USER_RES = 'LOGOUT_USER_RES';
export const LOGOUT_USER_ERR = 'LOGOUT_USER_ERR';

const getUsersReq = () => ({type: GET_USERS_REQ});
const getUsersRes = data => ({type: GET_USERS_RES, data});
const getUsersErr = error => ({type: GET_USERS_ERR, error});

const getUserReq = () => ({type: GET_USER_REQ});
const getUserRes = data => ({type: GET_USER_RES, data});
const getUserErr = error => ({type: GET_USER_ERR, error});

const regUserReq = () => ({type: REG_USER_REQ})
const regUserRes = data => ({type: REG_USER_RES, data})
const regUserErr = error => ({type: REG_USER_ERR, error})

const loginUserReq = () => ({type: LOGIN_USER_REQ})
const loginUserRes = data => ({type: LOGIN_USER_RES, data})
const loginUserErr = error => ({type: LOGIN_USER_ERR, error})

const logoutUserReq = () => ({type: LOGOUT_USER_REQ})
const logoutUserRes = data => ({type: LOGOUT_USER_RES, data})
const logoutUserErr = error => ({type: LOGOUT_USER_ERR, error})

export const deleteUser = id => async dispatch => {
    await axiosApi.delete('/user/'+id);

    dispatch(getUsers());
};

export const editUser = (id, user) => async (dispatch, getState) => {
    const myProfile = await getState().user.user;
    const changeUser = await axiosApi.put('/user/'+id, user);

    dispatch(getUserRes({}))

    if(changeUser.data._id === myProfile._id) {
        return dispatch(logoutUser())
    }

    dispatch(push('/usersList'))
};

export const getUsers = () => async dispatch => {
    try {
        dispatch(getUsersReq());

        const data = await axiosApi.get('/user');

        dispatch(getUsersRes(data.data))
    } catch (e) {
        dispatch(getUsersErr(e))
    }
};

export const getUser = id => async dispatch => {
    try {
        dispatch(getUserReq());

        const data = await axiosApi.get('/user/'+id);

        dispatch(getUserRes(data.data))
    } catch (e) {
        dispatch(getUserErr(e))
    }
};

export const registerUser = register => async dispatch => {
  try {
      dispatch(regUserReq());

      const data = await axiosApi.post('/user', register);

      dispatch(regUserRes(data.data))

      dispatch(push('/'))
  } catch (e) {
      dispatch(regUserErr(e))
  }
};

export const loginUser = login => async dispatch => {
    try {
        dispatch(loginUserReq());

        const data = await axiosApi.post('/user/sessions', login);

        dispatch(loginUserRes(data.data))

        dispatch(push('/'))
    } catch (e) {
        dispatch(loginUserErr(e))
    }
};

export const logoutUser = () => async dispatch => {
    try {
        dispatch(logoutUserReq());

        const data = await axiosApi.delete('/user/sessions');

        dispatch(logoutUserRes(data.data))

        dispatch(push('/login'))
    } catch (e) {
        dispatch(logoutUserErr(e))
    }
};