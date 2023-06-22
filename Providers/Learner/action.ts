import  React from 'react';
import { createAction } from 'redux-actions';
import { ILearner,ILearnerStateContext} from './context';

export enum LearnerActionEnum{
    AddLearnerRequest = 'ADD',
    UpdateLearnerRequest = 'UPDATE',
    DeleteLearnerRequest = 'DELETE',
    ViewLearnerRequest = 'VIEW',
}

export const AddLearnerRequestAction = createAction<ILearnerStateContext,ILearner>(LearnerActionEnum.AddLearnerRequest,(Create)=>({Create}))
export const UpdateLearnerRequestAction = createAction<ILearnerStateContext,ILearner>(LearnerActionEnum.UpdateLearnerRequest,(Update)=>({Update}))
export const DeleteLearnerRequestAction = createAction<ILearnerStateContext,string>(LearnerActionEnum.DeleteLearnerRequest,(deletedLearnerId)=>({deletedLearnerId}))
export const ViewRequestAction = createAction<ILearnerStateContext,Array<ILearner>>(LearnerActionEnum.ViewLearnerRequest,(View)=>({View}))