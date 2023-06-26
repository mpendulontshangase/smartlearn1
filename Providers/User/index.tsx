import React, {
  FC,
  PropsWithChildren,
  useReducer,
  useContext,
  useEffect,
} from "react";
import { UserReducer } from "./reducer";
import {
  INITIAL_STATE,
  ILogin,
  IUser,
  UserActionContext,
  UserContext,
} from "./context";
import { useMutate } from "restful-react";

import {
  loginUserRequestAction,
  createUserRequestAction,
  logOutUserRequestAction,
  setCurrentUserRequestAction,
  getUserDetailsRequestAction,
} from "./actions";
import { message } from "antd";
import { useRouter } from "next/router";
import { useState } from "react";
import {  ADMIN_DASHBOARD_PAGE_URL, LEARNER_DASHBOARD_PAGE_URL, LOGIN_URL, PARENT_DASHBOARD_PAGE_URL, TEACHER_DASHBOARD_PAGE_URL } from "../../routes";
import { getToken } from "../../utils/Decoder";
import axios from "axios";

const CreateURL = "https://localhost:44311/api/services/app/Parent/Create";

const UserProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const { mutate: loginUserHttp } = useMutate({
    path: "https://localhost:44311/api/TokenAuth/Authenticate",
    verb: "POST",
  });
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);

  const { push } = useRouter();

  const { mutate: createUserHttp } = useMutate({
    path: CreateURL,
    verb: "POST",
  });

  const createUser = async (payload: IUser) => {
    try {
      const response = await createUserHttp(payload);

      if (response.success) {
        message.success("User successfully created");
        dispatch(createUserRequestAction(response));
        push(LOGIN_URL);
      } else {
        message.error("Failed to dispatch the user on creation");
      }
    } catch (error) {
      console.error("User creation error:", error);
      message.error("An error occurred during user creation");
    }
  };

  const loginUser = async (payload: ILogin) => {
  
    try {
      const response = await loginUserHttp(payload);
      if (response.success) {
          localStorage.setItem('token', response.result.accessToken);
          dispatch(loginUserRequestAction(response.result));
          // push('/LearnerDashboard')
          const token = localStorage.getItem('token');
          const rolesResponse = await axios.get(`https://localhost:44311/api/services/app/User/GetUserRoles?userId=${response.result.userId}`, {
              headers: {
                  Authorization: `Bearer ${token}`
              }
          });
          const roles = rolesResponse.data.result;
          
          if (roles.includes('Parent')) {
            getUserDetails(response.result?.userId);
              push(PARENT_DASHBOARD_PAGE_URL);
          } else if (roles.includes('Teacher')) {
              getUserDetails(response.result.userId);
              
              push(TEACHER_DASHBOARD_PAGE_URL);
          } 
          else if (roles.includes('Learner')) {
            getUserDetails(response.result.userId);
            
            push(LEARNER_DASHBOARD_PAGE_URL);
        }
        else if (roles.includes('Admin')) {
          getUserDetails(response.result.userId);
          
          push(ADMIN_DASHBOARD_PAGE_URL);
      }
          else {
            getUserDetails(response.result?.userId);
              message.error("User not authorized!");
          }
      } else {
          message.error('Invalid username or password');
      }
  }
     catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login");
    }
  };
  // var USER = getToken()?.user.UserId;

  let theeid;

  if (typeof localStorage !== "undefined") {
    theeid = JSON.parse(localStorage.getItem("USERID"));
  }

  const getUserDetails = async (theeid) => {
    try {
      const response = await axios.get(
        `https://localhost:44311/api/services/app/Learner/GetPersonInfo?userId=${theeid}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch(getUserDetailsRequestAction(response.data.result));
    } catch (error) {
      message.error("An error occurred while trying to get Person info");
    }
  };

  const logoutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.removeItem("token");
    localStorage.removeItem("USERID");
  };

  return (
    <UserContext.Provider value={state}>
      <UserActionContext.Provider
        value={{
          getUserDetails,
          loginUser,
          createUser,
          logoutUser,
        }}
      >
        {children}
      </UserActionContext.Provider>
    </UserContext.Provider>
  );
};
function useLoginState() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useLoginActions() {
  const context = useContext(UserActionContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }
  return context;
}

function useUser() {
  return {
    ...useLoginActions(),
    ...useLoginState(),
  };
}

export { UserProvider, useUser };
