import  React from 'react';
import { createAction } from 'redux-actions';
import { ITeacher,ITeacherStateContext} from './context';

export enum TeacherActionEnum{
    AddTeacherRequest = 'ADD',
    UpdateTeacherRequest = 'UPDATE',
    DeleteTeacherRequest = 'DELETE',
    ViewTeacherRequest = 'VIEW',
}

export const AddTeacherRequestAction = createAction<ITeacherStateContext,ITeacher>(TeacherActionEnum.AddTeacherRequest,(Create)=>({Create}))
export const UpdateTeacherRequestAction = createAction<ITeacherStateContext,ITeacher>(TeacherActionEnum.UpdateTeacherRequest,(Update)=>({Update}))
export const DeleteTeacherRequestAction = createAction<ITeacherStateContext,string>(TeacherActionEnum.DeleteTeacherRequest,(deletedTeacherId)=>({deletedTeacherId}))
export const ViewRequestAction = createAction<ITeacherStateContext,Array<ITeacher>>(TeacherActionEnum.ViewTeacherRequest,(View)=>({View}))