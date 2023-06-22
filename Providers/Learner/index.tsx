import React, {
    FC,
    PropsWithChildren,
    useReducer,
    useContext,
    useState,
  } from "react";
  import { LearnerReducer } from "./reducer";
  import {
    INITIAL_STATE,
    ILearner,
    LearnerActionContext,
    LearnerContext,
  } from "./context";

  import { message } from "antd";
import { AddLearnerRequestAction, DeleteLearnerRequestAction, UpdateLearnerRequestAction, ViewRequestAction } from "./action";
import axios from "axios";

  
  const CreateLearnerUrl = "https://localhost:44311/api/services/app/Learner/CreateLearner";
  const getAllLearnerURL="https://localhost:44311/api/services/app/Learner/GetAll";
  const UpdateLearnerURL=`https://localhost:44311/api/services/app/Learner/Update`;
  
  const LearnerProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(LearnerReducer, INITIAL_STATE);
  
    const CreateLearner = async (payload: ILearner) => {
      try {
        console.log(payload);
    
        await axios.post(CreateLearnerUrl, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        dispatch(AddLearnerRequestAction(payload));
        message.success('Learner Added successfully');
      } catch (error) {
        // Handle the error here
        message.error('An error occurred: Trying to create Learner');
      }
    };
    
    
    const DeleteLearner = async (LearnerId: string) => {
      try {
        await fetch(
          `https://localhost:44311/api/services/app/Learners/Delete?id=${LearnerId}`,
          {
            method: "DELETE",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
      
            },
          }
        ).then((res) => {
          if (!res.ok) {
            throw new Error("Request failed with status " + res.status);
          }
          return res.json();
        }).then(() => {
          dispatch(DeleteLearnerRequestAction(LearnerId));
          message.success("Learner deleted successfully");
        });
      } catch (error) {
        // Handle the error here
        message.error("An error occurred: trying to delete Learner");
      }
    };
    
  
    const UpdateLearner = async (data: ILearner) => {
      try {
        await fetch(UpdateLearnerURL, {
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
              dispatch(UpdateLearnerRequestAction(data.result));
              console.log(data.result);
              message.success("Learner updated successfully");
            });
          })
         
      } catch (error) {
        // Handle any synchronous errors here
        message.error("An error occurred: Trying to update the Learner");
      }
    };

const ViewLearner = async () => {
  
  try {
    const response = await axios.get(getAllLearnerURL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(ViewRequestAction(response.data.result));
    console.log("Learrner=",response.data.result)

  } catch (error) {
    message.error("An error occurred while trying to get Learner from the DB");
  }
};

    return (
      <LearnerContext.Provider value={state}>
        <LearnerActionContext.Provider
          value={{
            CreateLearner,
            ViewLearner,
            DeleteLearner,
            UpdateLearner,
          }}
        >
          {children}
        </LearnerActionContext.Provider>
      </LearnerContext.Provider>
    );
  };
  
  function useCreateLearnerState() {
    const context = useContext(LearnerContext);
    if (!context) {
      throw new Error("useAddLearnerState must be used within a LearnerProvider");
    }
    return context;
  }
  
  function useCreateLearnerActions() {
    const context = useContext(LearnerActionContext);
    if (!context) {
      throw new Error("useAddLearnerActions must be used within a LearnerProvider");
    }
    return context;
  }
  
  function useLearner() {
    return { ...useCreateLearnerState(), ...useCreateLearnerActions() };
  }
  
  export { LearnerProvider, useLearner };
  