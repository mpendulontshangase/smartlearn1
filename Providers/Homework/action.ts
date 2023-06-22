import  React from 'react';
import { createAction } from 'redux-actions';
import { IHomework,IHomeworkStateContext} from './context';

export enum HomeworkActionEnum{
    AddHomeworkRequest = 'ADD',
    UpdateHomeworkRequest = 'UPDATE',
    DeleteHomeworkRequest = 'DELETE',
    ViewHomeworkRequest = 'VIEW',
}

export const AddHomeworkRequestAction = createAction<IHomeworkStateContext,IHomework>(HomeworkActionEnum.AddHomeworkRequest,(Create)=>({Create}))
export const UpdateHomeworkRequestAction = createAction<IHomeworkStateContext,IHomework>(HomeworkActionEnum.UpdateHomeworkRequest,(Update)=>({Update}))
export const DeleteHomeworkRequestAction = createAction<IHomeworkStateContext,string>(HomeworkActionEnum.DeleteHomeworkRequest,(deletedHomeworkId)=>({deletedHomeworkId}))
export const ViewRequestAction = createAction<IHomeworkStateContext,Array<IHomework>>(HomeworkActionEnum.ViewHomeworkRequest,(View)=>({View}))