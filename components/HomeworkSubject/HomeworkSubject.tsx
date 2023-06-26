import React, { useEffect, useState } from "react";
import { Button, Calendar, Form, Input, Select } from "antd";
import Link from "next/link";
import { useHomework } from "../../Providers/Homework";
import styles from "./style.module.css";
import SendMessage from "../SendMessage/sendmessage";
import { IMessage } from "../../Providers/Messages/context";
import { useMessage } from "../../Providers/Messages";
import { useForm } from "antd/es/form/Form";
import { StyleProvider } from "@ant-design/cssinjs";
import { useLearner } from "../../Providers/Learner";
import { useUser } from "../../Providers/User";
import { getToken } from "../../utils/Decoder";
import { CheckCircleOutlined } from "@ant-design/icons";

const HomeworkComponent = () => {
  const { View, ViewHomework } = useHomework();
  const { ViewL, ViewLearner } = useLearner();
  const { getUserDetails, personInfo } = useUser();
  let userid = getToken()?.user.UserId;

  useEffect(() => {
    ViewHomework();
    ViewLearner();
    // getUserDetails(userid);
  }, []);

  // const getIsiZuluHomeworks = () => {
  //   const isiZuluHomeworks = ViewL.find((learner) =>
  //     learner.subjectDisplay.includes("isiZulu")
  //   );
  //   if (isiZuluHomeworks) {
  //     return [isiZuluHomeworks]; // Wrap the result in an array to match the return type
  //   }
  //   return [];
  // };
  
  
  
  

  const [clickedId, setClickedId] = useState("");

  const handleClick = (id) => {
    setClickedId(id);
    
  };

  return (
    <>
      <div style={{ display: "flex" }}>

        <div className={styles.cover}>
          <div className={styles.container}>
            {View.map((homework) => (
              <div
                key={homework.id}
                className={`${styles.homework} ${
                  clickedId === homework.id ? styles.clicked : ""
                }`}
              >
                <p className={styles.subject}>Subject: {homework.subjectDisplay}</p>
                <p className={styles.grade}>Grade: {homework.gradeName}</p>
                <div className={styles.details}>
                  <p className={styles.title}>New Homework</p>
                  <br />
                  <p onClick={() => handleClick(homework.id)}>
                    {homework.homeworkDescription}{" "}
                    <CheckCircleOutlined
                      className={clickedId === homework.id ? styles.blue : ""}
                    />
                  </p>
                  <p>{homework.file}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeworkComponent;

// import { useRouter } from "next/router";

// const HomeworkSubject = () => {
//   const router = useRouter();
//   const { subject, grade } = router.query;

//   // You can now use the subject and grade values in your component
//   // for rendering or any other logic

//   return (
//     <div>
//       <h1>Homework Subject: {subject}</h1>
//       <p>Grade: {grade}</p>
//       {/* Rest of your component */}
//     </div>
//   );
// };

// export default HomeworkSubject;

