
export interface IActiveUserInfo {
    user?: IUserOut;
    accessToken?: string;
    id?: string
  }

  export interface IUserOut {
    UserId:string;
    username: string;
    email: string
  }
  