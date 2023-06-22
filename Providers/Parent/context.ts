import { createContext } from "react";

export interface IParent {
  id: string;
  name:string;
  secondName:string;
  surname:string;
  idNumber:string
  username?: string;
  emailAddress: string;
  password: string;
  phoneNumber:string;
  streetAddress:string;
  age?: number;
  gender:any;
  dateOfBirth:any;
  relationship?: string;
  passport?: string;
  grade?: string;
  subject?: string;

}

export interface IParentStateContext {
  readonly Update?: IParent;
  readonly Create?: IParent;
  readonly deletedParentId?: string;
  readonly View?: IParent[];
}

export const INITIAL_STATE: IParentStateContext = {
  View: [],
  deletedParentId: undefined,
  Update: undefined,
  Create: undefined,
};

export interface IParentActionContext {
  UpdateParent?: (payload: IParent) => void;
  CreateParent?: (payload: IParent) => void;
  DeleteParent?: (payload: string) => void;
  ViewParent?: () => void;
}

const ParentContext = createContext<IParentStateContext>(INITIAL_STATE);

const ParentActionContext = createContext<IParentActionContext>({
    UpdateParent: undefined,
  CreateParent: undefined,
  DeleteParent: undefined,
  ViewParent: undefined,
});

export { ParentContext, ParentActionContext };
