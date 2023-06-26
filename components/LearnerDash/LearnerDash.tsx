import React, { useEffect, useState } from "react";

import Image from "next/image";
import styles from "./style.module.css";
import Learner from "../AddLearner/Learner";
import { Button, Calendar, Form, Input, Select } from "antd";
import Link from "next/link";
import SendMessage from "../SendMessage/sendmessage";
import Message from "../../pages/Message";
import MessagesComp from "../Messages/messages";
import { IMessage } from "../../Providers/Messages/context";
import { useMessage } from "../../Providers/Messages";
import { useForm } from "antd/es/form/Form";
import { StyleProvider } from "@ant-design/cssinjs";
import accounting from "./accounting.jpg";
import { useLearner } from "../../Providers/Learner";
import { useUser } from "../../Providers/User";
import { getToken } from "../../utils/Decoder";

const LearnerDash = () => {

  const {getUserDetails,personInfo}=useUser();
  const { ViewL ,ViewLearner} = useLearner();
  let userid= getToken()?.user.UserId;
  const [gradee,setgrade]=useState(null)


    useEffect(()=>{
        ViewLearner();
      

         getUserDetails(userid);
  

        
    },[])
  
  





  const { Option } = Select;

  const getParentSubjects = () => {
    const loggedInLearner = ViewL.find((learner) => learner?.id === personInfo?.id);
    if (loggedInLearner) {
      const parentSubjects = loggedInLearner.subjectDisplay;
   
      return parentSubjects;
    }
    return [];
  };
  

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
        

          <div style={{ width: "300px" }}>
            
         
            <div
              style={{
                backgroundColor: "green",
                border: "1px solid #69b1ff",
                borderRadius: "10px",
                width: "300px",
              }}
            >
              <Calendar style={{ width: "300px" }} fullscreen={false} />
            </div>
          </div>
        </div>

        <div className={styles.cover}>
        <div className={styles.container}>
    
        {getParentSubjects().map((subject, subjectIndex) => (
  <Link href="/HomeworkSubject">
    <div key={subjectIndex} className={styles.List}>
      <span className={styles.MovieTitle}>{subject}</span>
    </div>
  </Link>
))}


    
  </div>
  
          
           
    
</div>

      </div>
    </>
  );
};

export default LearnerDash;
