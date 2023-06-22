import { createContext } from "react";

export interface ITeacher {
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

export interface ITeacherStateContext {
  readonly Update?: ITeacher;
  readonly Create?: ITeacher;
  readonly deletedTeacherId?: string;
  readonly View?: ITeacher[];
}

export const INITIAL_STATE: ITeacherStateContext = {
  View: [],
  deletedTeacherId: undefined,
  Update: undefined,
  Create: undefined,
};

export interface ITeacherActionContext {
  UpdateTeacher?: (payload: ITeacher) => void;
  CreateTeacher?: (payload: ITeacher) => void;
  DeleteTeacher?: (payload: string) => void;
  ViewbyUserIdTeacher?: (payload: string) => void;
  ViewTeacher?: () => void;
}

const TeacherContext = createContext<ITeacherStateContext>(INITIAL_STATE);

const TeacherActionContext = createContext<ITeacherActionContext>({
    UpdateTeacher: undefined,
  CreateTeacher: undefined,
  DeleteTeacher: undefined,
  ViewTeacher: undefined,
});

export { TeacherContext, TeacherActionContext };
