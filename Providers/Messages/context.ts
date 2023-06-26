import { createContext } from "react";

export interface IMessage {
  id: string;
  message_Description:string;
  time_sent:string;
  reply:string;
  subject?:any[];
  grade?:any
  
}
export interface IReply{
    id: string;
    message_Description:string;
    time_sent:string;
    reply:string;
    
  }

export interface IMessageStateContext {
  readonly Update?: IMessage;
  readonly Create?: IMessage;
  readonly deletedMessageId?: string;
  readonly View?: IMessage[];
}

export const INITIAL_STATE: IMessageStateContext = {
  View: [],
  deletedMessageId: undefined,
  Update: undefined,
  Create: undefined,
};

export interface IMessageActionContext {
  UpdateMessage?: (payload: IMessage) => void;
  CreateMessage?: (payload: IMessage) => void;
  DeleteMessage?: (payload: string) => void;
  ViewbyUserIdMessage?: (payload: string) => void;
  ViewMessage?: () => void;
}

const MessageContext = createContext<IMessageStateContext>(INITIAL_STATE);

const MessageActionContext = createContext<IMessageActionContext>({
    UpdateMessage: undefined,
  CreateMessage: undefined,
  DeleteMessage: undefined,
  ViewMessage: undefined,
});

export { MessageContext, MessageActionContext };
