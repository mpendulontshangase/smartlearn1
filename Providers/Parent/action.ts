import  React from 'react';
import { createAction } from 'redux-actions';
import { IParent,IParentStateContext} from './context';

export enum ParentActionEnum{
    AddParentRequest = 'ADD',
    UpdateParentRequest = 'UPDATE',
    DeleteParentRequest = 'DELETE',
    ViewParentRequest = 'VIEW',
}

export const AddParentRequestAction = createAction<IParentStateContext,IParent>(ParentActionEnum.AddParentRequest,(Create)=>({Create}))
export const UpdateParentRequestAction = createAction<IParentStateContext,IParent>(ParentActionEnum.UpdateParentRequest,(Update)=>({Update}))
export const DeleteParentRequestAction = createAction<IParentStateContext,string>(ParentActionEnum.DeleteParentRequest,(deletedParentId)=>({deletedParentId}))
export const ViewRequestAction = createAction<IParentStateContext,Array<IParent>>(ParentActionEnum.ViewParentRequest,(View)=>({View}))