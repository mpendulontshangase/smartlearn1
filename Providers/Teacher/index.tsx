import React, {
  FC,
  PropsWithChildren,
  useReducer,
  useContext,
  useState,
} from "react";
import { TeacherReducer } from "./reducer";
import {
  INITIAL_STATE,
  ITeacher,
  TeacherActionContext,
  TeacherContext,
} from "./context";

import { message } from "antd";
import {
  AddTeacherRequestAction,
  DeleteTeacherRequestAction,
  UpdateTeacherRequestAction,
  ViewRequestAction,
} from "./action";
import axios from "axios";
import { getToken } from "../../utils/Decoder";

const CreateUrl = "https://localhost:44311/api/services/app/Teacher/Create";
const getAllTeacherURL =
  "https://localhost:44311/api/services/app/Teacher/GetAll";

  const getTeacherbyUserIdURL = "https://localhost:44311/api/services/app/Teacher/GetByUserId?userId=";
const UpdateTeacherURL = `https://localhost:44311/api/services/app/Teacher/Update`;

const TeacherProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(TeacherReducer, INITIAL_STATE);

  const CreateTeacher = async (payload: ITeacher) => {
    try {
      console.log("ww", payload);

      const response = await axios.post(CreateUrl, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        dispatch(AddTeacherRequestAction(payload));
        message.success("Teacher Added successfully");
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      // Handle the error here
      message.error("An error occurred: Trying to create Teacher");
    }
  };

  const DeleteTeacher = async (TeacherId: string) => {
    try {
      const response = await axios.delete(
        `https://localhost:44311/api/services/app/Teacher/Delete?id=${TeacherId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(DeleteTeacherRequestAction(TeacherId));
        message.success("Teacher deleted successfully");
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      // Handle the error here
      message.error("An error occurred: trying to delete Teacher");
    }
  };

  const UpdateTeacher = async (data: ITeacher) => {
    try {
      const response = await axios.put(UpdateTeacherURL, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        dispatch(UpdateTeacherRequestAction(response.data.result));
        console.log(response.data.result);
        message.success("Teacher updated successfully");
      } else {
        throw new Error("Request failed with status " + response.status);
      }
    } catch (error) {
      // Handle the error here
      message.error("An error occurred: Trying to update the Teacher");
    }
  };

  const ViewTeacher = async () => {
    try {
      const response = await axios.get(getAllTeacherURL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch(ViewRequestAction(response.data.result));
    } catch (error) {
      message.error(
        "An error occurred while trying to get Teacher from the DB"
      );
    }
  };

  
    var userIdRetriever = getToken()?.user.UserId;
  


  // console.log("watt::",userIdRetriever)


  // const ViewbyUserIdTeacher = async (userIdRetriever) => {
  //   try {
  //     const response = await axios.get(`https://localhost:44311/api/services/app/Teacher/GetByUserId?userId=${userIdRetriever}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     dispatch(ViewRequestAction(response.data.result.id));

  
  //   } catch (error) {
  //     message.error(
  //       "An error occurred while trying to get Teacher from the DB"
  //     );
  //   }
  // };

  return (
    <TeacherContext.Provider value={state}>
      <TeacherActionContext.Provider
        value={{
          // ViewbyUserIdTeacher,
          CreateTeacher,
          ViewTeacher,
          DeleteTeacher,
          UpdateTeacher,
        }}
      >
        {children}
      </TeacherActionContext.Provider>
    </TeacherContext.Provider>
  );
};

function useCreateTeacherState() {
  const context = useContext(TeacherContext);
  if (!context) {
    throw new Error("useAddTeacherState must be used within a TeacherProvider");
  }
  return context;
}

function useCreateTeacherActions() {
  const context = useContext(TeacherActionContext);
  if (!context) {
    throw new Error(
      "useAddTeacherActions must be used within a TeacherProvider"
    );
  }
  return context;
}

function useTeacher() {
  return { ...useCreateTeacherState(), ...useCreateTeacherActions() };
}

export { TeacherProvider, useTeacher };
