import React, {
    FC,
    PropsWithChildren,
    useReducer,
    useContext,
    useState,
  } from "react";
  import { MessageReducer } from "./reducer";
  import {
    INITIAL_STATE,
    IMessage,
    MessageActionContext,
    MessageContext,
  } from "./context";
  
  import { message } from "antd";
  import {
    AddMessageRequestAction,
    DeleteMessageRequestAction,
    UpdateMessageRequestAction,
    ViewRequestAction,
  } from "./action";
  import axios from "axios";
  import { getToken } from "../../utils/Decoder";
  
  const CreateUrl = "https://localhost:44311/api/services/app/Message/Create";
  const getAllMessageURL =
    "https://localhost:44311/api/services/app/Message/GetAll";
  
    const getMessagebyUserIdURL = "https://localhost:44311/api/services/app/Message/GetByUserId?userId=";
  const UpdateMessageURL = `https://localhost:44311/api/services/app/Message/Update`;
  
  const MessageProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
    const [state, dispatch] = useReducer(MessageReducer, INITIAL_STATE);
  
    const CreateMessage = async (payload: IMessage) => {
      try {
       
  
        const response = await axios.post(CreateUrl, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          dispatch(AddMessageRequestAction(payload));
          message.success("Message Added successfully");
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        // Handle the error here
        message.error("An error occurred: Trying to create Message");
      }
    };
  
    const DeleteMessage = async (MessageId: string) => {
      try {
        const response = await axios.delete(
          `https://localhost:44311/api/services/app/Message/Delete?id=${MessageId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.status === 200) {
          dispatch(DeleteMessageRequestAction(MessageId));
          message.success("Message deleted successfully");
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        // Handle the error here
        message.error("An error occurred: trying to delete Message");
      }
    };
  
    const UpdateMessage = async (data: IMessage) => {
      try {
        const response = await axios.put(UpdateMessageURL, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.status === 200) {
          dispatch(UpdateMessageRequestAction(response.data.result));
         
          message.success("Message updated successfully");
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      } catch (error) {
        // Handle the error here
        message.error("An error occurred: Trying to update the Message");
      }
    };
  
    const ViewMessage = async () => {
      try {
        const response = await axios.get(getAllMessageURL, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch(ViewRequestAction(response.data.result));
      } catch (error) {
        message.error(
          "An error occurred while trying to get Message from the DB"
        );
      }
    };
  
    
      var userIdRetriever = getToken()?.user.UserId;
    
  
  

  
  
    // const ViewbyUserIdMessage = async (userIdRetriever) => {
    //   try {
    //     const response = await axios.get(`https://localhost:44311/api/services/app/Message/GetByUserId?userId=${userIdRetriever}`, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     });
    //     dispatch(ViewRequestAction(response.data.result.id));
  
    
    //   } catch (error) {
    //     message.error(
    //       "An error occurred while trying to get Message from the DB"
    //     );
    //   }
    // };
  
    return (
      <MessageContext.Provider value={state}>
        <MessageActionContext.Provider
          value={{
            // ViewbyUserIdMessage,
            CreateMessage,
            ViewMessage,
            DeleteMessage,
            UpdateMessage,
          }}
        >
          {children}
        </MessageActionContext.Provider>
      </MessageContext.Provider>
    );
  };
  
  function useCreateMessageState() {
    const context = useContext(MessageContext);
    if (!context) {
      throw new Error("useAddMessageState must be used within a MessageProvider");
    }
    return context;
  }
  
  function useCreateMessageActions() {
    const context = useContext(MessageActionContext);
    if (!context) {
      throw new Error(
        "useAddMessageActions must be used within a MessageProvider"
      );
    }
    return context;
  }
  
  function useMessage() {
    return { ...useCreateMessageState(), ...useCreateMessageActions() };
  }
  
  export { MessageProvider, useMessage };
  