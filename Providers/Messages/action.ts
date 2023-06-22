import  React from 'react';
import { createAction } from 'redux-actions';
import { IMessage,IMessageStateContext} from './context';

export enum MessageActionEnum{
    AddMessageRequest = 'ADD',
    UpdateMessageRequest = 'UPDATE',
    DeleteMessageRequest = 'DELETE',
    ViewMessageRequest = 'VIEW',
}

export const AddMessageRequestAction = createAction<IMessageStateContext,IMessage>(MessageActionEnum.AddMessageRequest,(Create)=>({Create}))
export const UpdateMessageRequestAction = createAction<IMessageStateContext,IMessage>(MessageActionEnum.UpdateMessageRequest,(Update)=>({Update}))
export const DeleteMessageRequestAction = createAction<IMessageStateContext,string>(MessageActionEnum.DeleteMessageRequest,(deletedMessageId)=>({deletedMessageId}))
export const ViewRequestAction = createAction<IMessageStateContext,Array<IMessage>>(MessageActionEnum.ViewMessageRequest,(View)=>({View}))