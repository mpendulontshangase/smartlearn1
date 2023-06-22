import { LOGIN_URL } from '../routes';
// import { ILogin, IUser } from './../Providers/Login/context';
import jwt_decode from 'jwt-decode';
import { ACCESS_TOKEN_NAME } from './nameholder';
import { IActiveUserInfo } from '../models/acc.models';


// interface IAccessToken extends ILogin {
//   encryptedAccessToken: string | null;
//   expireInSeconds: number;
//   expireOn: string;
// }

export interface IDecodedToken {
  readonly 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'?: string;
  readonly 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'?: string;
  readonly 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'?: string;
  readonly exp?: number;
  readonly id?: string;
}

export const saveUserToken = (token: string, removeCredentials: boolean = true) => {
  try {
    if (removeCredentials) {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(ACCESS_TOKEN_NAME, token);
    }
  } catch (error) {
    localStorage.removeItem(ACCESS_TOKEN_NAME);
  }
};

export const getToken = () => {


  try {
    if (typeof window === 'object') {
      const token = localStorage.getItem(ACCESS_TOKEN_NAME);
      if (!!token) {
        var decoded = jwt_decode(token) as IDecodedToken;
     
        const isTokenValid = Math.floor(new Date().getTime() / 1000) <= decoded?.exp;
        if (isTokenValid) {
          const { 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': id, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': username, 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': email } = decoded;
          
           const accDetails: IActiveUserInfo = {
            user: {
              UserId: id,
              username: username,
              email: email,
            },
            accessToken: token,
          };

          localStorage.setItem("USERID",accDetails.user.UserId)

          


          return accDetails;
        } else {
          // localStorage.removeItem(ACCESS_TOKEN_NAME);
          return ({});
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

// console.log("getttt",getToken().user.UserId)

export const removeAccessToken = () => {
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ACCESS_TOKEN_NAME);
      window.location.href = LOGIN_URL;
      return true;
    }
  } catch (error) {
    return false;
  }
};
