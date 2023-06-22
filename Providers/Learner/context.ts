import { createContext } from "react";

export interface ILearner {
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

export interface ILearnerStateContext {
  readonly Update?: ILearner;
  readonly Create?: ILearner;
  readonly deletedLearnerId?: string;
  readonly View?: ILearner[];
}

export const INITIAL_STATE: ILearnerStateContext = {
  View: [],
  deletedLearnerId: undefined,
  Update: undefined,
  Create: undefined,
};

export interface ILearnerActionContext {
  UpdateLearner?: (payload: ILearner) => void;
  CreateLearner?: (payload: ILearner) => void;
  DeleteLearner?: (payload: string) => void;
  ViewLearner?: () => void;
}

const LearnerContext = createContext<ILearnerStateContext>(INITIAL_STATE);

const LearnerActionContext = createContext<ILearnerActionContext>({
    UpdateLearner: undefined,
  CreateLearner: undefined,
  DeleteLearner: undefined,
  ViewLearner: undefined,
});

export { LearnerContext, LearnerActionContext };
