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
import { DASHBOARD_PAGE_URL, LOGIN_URL } from "../../routes";
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
    console.log("am in create");

    try {
      console.log("nalapha ngisasekhona");

      const response = await createUserHttp(payload);
      console.log("response::", response);

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
    console.log("am in");
    try {
      console.log("data");

      const response = await loginUserHttp(payload);
      
      if (response.success && response.result.accessToken) {
        localStorage.setItem("token", response.result.accessToken);
        dispatch(loginUserRequestAction(response));
        message.success("User successfully logged in");
        push(DASHBOARD_PAGE_URL);
      } else {
        message.error("Incorrect email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error("An error occurred during login");
    }
  };
  // var USER = getToken()?.user.UserId;


  let theeid;

  if (typeof localStorage !== 'undefined') {
    theeid =  JSON.parse(localStorage.getItem('USERID'));

    console.log("sssss",theeid)

    const thok = getToken()?.user.UserId;

    console.log("xxxx",thok)

    
  }

  // const getUserDetails = async (thok) => {
  //   try {
  //     console.log("kwe",thok)
  //     const response = await axios.get(`https://localhost:44311/api/services/app/Teacher/GetByUserId?userId=${thok}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     dispatch(getUserDetailsRequestAction(response.data.result.id));
  //     console.log('aybo',response.data.result.id)
  //     localStorage.setItem("thy",response.data.result.id)

     
  //   } catch (error) {
  //     message.error(
  //       "An error occurred while trying to get Teacher from the DB"
  //     );
  //   }
  // };

  const logoutUser = () => {
    dispatch(logOutUserRequestAction());
    localStorage.removeItem("token");
    localStorage.removeItem("USERID");
  };

  return (
    <UserContext.Provider value={state}>
      <UserActionContext.Provider
        value={{
          // getUserDetails,
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
