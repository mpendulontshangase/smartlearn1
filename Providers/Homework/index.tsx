import React, {
    FC,
    PropsWithChildren,
    useReducer,
    useContext,
    useState,
  } from "react";
  import { HomeworkReducer } from "./reducer";
  import {
    INITIAL_STATE,
    IHomework,
    HomeworkActionContext,
    HomeworkContext,
  } from "./context";

  import { message } from "antd";
import { AddHomeworkRequestAction, DeleteHomeworkRequestAction, UpdateHomeworkRequestAction, ViewRequestAction } from "./action";
import axios from "axios";

  
  const CreateUrl = "https://localhost:44311/api/services/app/Homework/Create";
  const getAllHomeworkURL="https://localhost:44311/api/services/app/Homework/GetAll";
  const UpdateHomeworkURL=`https://localhost:44311/api/services/app/Homework/Update`;
  
  const HomeworkProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(HomeworkReducer, INITIAL_STATE);
  
  

    const CreateHomework = async (payload: FormData) => {
      try {
    
    
        let response = await axios.post(CreateUrl, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        dispatch(AddHomeworkRequestAction(response.data));
        message.success("Homework added successfully");
      } catch (error) {
        // Handle the error here
        message.error("An error occurred while trying to create homework");
      }
    };
    
    
    const DeleteHomework = async (HomeworkId: string) => {
        try {
          await axios.delete(
            `https://localhost:44311/api/services/app/Homeworks/Delete?id=${HomeworkId}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
      
          dispatch(DeleteHomeworkRequestAction(HomeworkId));
          message.success("Homework deleted successfully");
        } catch (error) {
          // Handle the error here
          message.error("An error occurred while trying to delete homework");
        }
      };
    
  
    const UpdateHomework = async (data: IHomework) => {
      try {
        await fetch(UpdateHomeworkURL, {
          method: "PUT",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          
          },
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Request failed with status " + res.status);
            }
            return res.json().then((data) => {
              dispatch(UpdateHomeworkRequestAction(data.result));
             
              message.success("Homework updated successfully");
            });
          })
         
      } catch (error) {
        // Handle any synchronous errors here
        message.error("An error occurred: Trying to update the Homework");
      }
    };

    const ViewHomework = async () => {
        try {
          const response = await axios.get(getAllHomeworkURL, {
            headers: {
              "Content-Type": "application/json",
            },
          });
      
          const homeworkData = response.data.result;
          dispatch(ViewRequestAction(homeworkData));

       
        } catch (error) {
          message.error("An error occurred while trying to get Homework from the DB");
        }
      };

    return (
      <HomeworkContext.Provider value={state}>
        <HomeworkActionContext.Provider
          value={{
            CreateHomework,
            ViewHomework,
            DeleteHomework,
            UpdateHomework,
          }}
        >
          {children}
        </HomeworkActionContext.Provider>
      </HomeworkContext.Provider>
    );
  };
  
  function useCreateHomeworkState() {
    const context = useContext(HomeworkContext);
    if (!context) {
      throw new Error("useAddHomeworkState must be used within a HomeworkProvider");
    }
    return context;
  }
  
  function useCreateHomeworkActions() {
    const context = useContext(HomeworkActionContext);
    if (!context) {
      throw new Error("useAddHomeworkActions must be used within a HomeworkProvider");
    }
    return context;
  }
  
  function useHomework() {
    return { ...useCreateHomeworkState(), ...useCreateHomeworkActions() };
  }
  
  export { HomeworkProvider, useHomework };
  