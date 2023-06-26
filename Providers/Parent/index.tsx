import React, {
    FC,
    PropsWithChildren,
    useReducer,
    useContext,
    useState,
  } from "react";
  import { ParentReducer } from "./reducer";
  import {
    INITIAL_STATE,
    IParent,
    ParentActionContext,
    ParentContext,
  } from "./context";

  import { message } from "antd";
import { AddParentRequestAction, DeleteParentRequestAction, UpdateParentRequestAction, ViewRequestAction } from "./action";
import axios from "axios";

  
  const CreateUrl = "https://localhost:44311/api/services/app/Parents/Create";
  const getAllParentURL="https://localhost:44311/api/services/app/Parent/GetAll";
  const UpdateParentURL=`https://localhost:44311/api/services/app/Parent/Update`;
  
  const ParentProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(ParentReducer, INITIAL_STATE);
  
    const CreateParent = async (payload: IParent) => {
      try {

    
        await fetch(CreateUrl, {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
           
          },
          body: JSON.stringify(payload),
        }).then((res) => {
          if (!res.ok) {
            throw new Error("Request failed with status " + res.status);
          }
          return res.json();
        }).then(() => {
          dispatch(AddParentRequestAction(payload));
          message.success("Parent Added successfully");
        });
      } catch (error) {
        // Handle the error here
        message.error("An error occurred:Trying to create Parent");
      }
    };
    
    const DeleteParent = async (ParentId: string) => {
      try {
        await fetch(
          `https://localhost:44311/api/services/app/Parents/Delete?id=${ParentId}`,
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
          dispatch(DeleteParentRequestAction(ParentId));
          message.success("Parent deleted successfully");
        });
      } catch (error) {
        // Handle the error here
        message.error("An error occurred: trying to delete Parent");
      }
    };
    
  
    const UpdateParent = async (data: IParent) => {
      try {
        await fetch(UpdateParentURL, {
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
              dispatch(UpdateParentRequestAction(data.result));
            
              message.success("Parent updated successfully");
            });
          })
         
      } catch (error) {
        // Handle any synchronous errors here
        message.error("An error occurred: Trying to update the Parent");
      }
    };

const ViewParent = async () => {
  
  try {
    const response = await axios.get(getAllParentURL, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch(ViewRequestAction(response.data.result));
  } catch (error) {
    message.error("An error occurred while trying to get Parent from the DB");
  }
};

    return (
      <ParentContext.Provider value={state}>
        <ParentActionContext.Provider
          value={{
            CreateParent,
            ViewParent,
            DeleteParent,
            UpdateParent,
          }}
        >
          {children}
        </ParentActionContext.Provider>
      </ParentContext.Provider>
    );
  };
  
  function useCreateParentState() {
    const context = useContext(ParentContext);
    if (!context) {
      throw new Error("useAddParentState must be used within a ParentProvider");
    }
    return context;
  }
  
  function useCreateParentActions() {
    const context = useContext(ParentActionContext);
    if (!context) {
      throw new Error("useAddParentActions must be used within a ParentProvider");
    }
    return context;
  }
  
  function useParent() {
    return { ...useCreateParentState(), ...useCreateParentActions() };
  }
  
  export { ParentProvider, useParent };
  