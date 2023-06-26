
import { DatePicker } from 'antd';
import { createContext } from "react";

export interface IUser {
  id?: string;
  Name:string;
  SecondName:string;
  Surname:string;
  IDNumber:string
  Username: string;
  EmailAddress: string;
  Password: string;
  PhoneNumber:string;
  StreetAddress:string;
  Age: number;
  Gender:any;
  DateOfBirth:any;
  Relationship: string;
  Passport: string;



}
export interface IParent {
  Relationship: string;
}

export interface ITeacher {
  Grade: any;
  Subject: any;
}

export interface ILearner {
  Grade: any;
  Subject: any;
}

export interface ILogin{
    userNameOrEmailAddress:string,
    password:string
}
export interface IUserStateContext {
    readonly UserLogin?: ILogin;
    readonly CreateUser?: IUser;
    readonly UserLogOut?: IUser;
    readonly currentUser?: IUser;
    readonly user?: IUser;
    personInfo?: any;
  }

export const INITIAL_STATE: IUserStateContext = {};


export interface IUserActionContext {
  loginUser?: (payload: ILogin) => void;
  ViewbyUserIdTeacher?: (payload:string) => void;
  createUser?: (payload: IUser) => void;
  logoutUser?: () => void;
  setCurrentUser?: (user: IUser) => void;
  getUserDetails?: (userId: any) => void;
}

const UserContext = createContext<IUserStateContext>(INITIAL_STATE);

const UserActionContext = createContext<IUserActionContext>({});

export { UserContext, UserActionContext };
