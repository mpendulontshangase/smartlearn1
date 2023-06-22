import  React from 'react';
import { createAction } from 'redux-actions';
import {ILogin, IUser, IUserStateContext} from './context';

export enum UserActionEnum{
    loginUserRequest = 'LOGIN',
    createUserRequest = 'CREATE',
    logOutUserRequest = 'LOGOUT',
    setCurrentUserRequest = 'SET_CURRENT_USER',
    getUserDetailsRequest='GET_USER',
}

export const loginUserRequestAction = createAction<IUserStateContext, ILogin>(UserActionEnum.loginUserRequest,()=>({}))
export const createUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.createUserRequest,(CreateUser)=>({CreateUser}))
export const logOutUserRequestAction = createAction<IUserStateContext>(UserActionEnum.logOutUserRequest,()=>({}))
export const setCurrentUserRequestAction = createAction<IUserStateContext, IUser>(UserActionEnum.setCurrentUserRequest,(currentUser)=>({currentUser}))
export const getUserDetailsRequestAction = createAction<IUserStateContext, number>(UserActionEnum.getUserDetailsRequest,(id)=>({}))