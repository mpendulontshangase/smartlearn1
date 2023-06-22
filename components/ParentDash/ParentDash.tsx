import React from "react";
import styles from "./style.module.css";
import Learner from "../AddLearner/Learner";
import { Button, Calendar } from "antd";
import Link from "next/link";
import SendMessage from "../SendMessage/sendmessage";

const ExampleComponent = () => {
  return (
    <>
      <div className={styles.button}>
        <div>
          <Learner />
        </div>
        <div>
            <Button  style={{backgroundColor:"green",color:"white"}}>
            <Link style={{textDecoration:"none"}} href="/ViewMessage">View Message History</Link>
                
                </Button>
        </div>
        <div >
          <SendMessage/>
        </div>
      </div>

      <div >
      {/* <Calendar  fullscreen={false}/> */}
      </div>

      <div className={styles.flex}>
        <div  className={styles.thebox}>
         <Link href="/Subject">
         <div className={styles.cover}>
            <div className={styles.container}>
              <span className={styles.MovieSubject}>Subject</span>
              <span className={styles.MovieGrade}>Grade</span>
            </div>
          </div>
         </Link>

          <div className={styles.cover}>
            <div className={styles.container}>
              <span className={styles.MovieSubject}>Subject</span>
              <span className={styles.MovieGrade}>Grade</span>
            </div>
           
          </div>

          <div className={styles.cover}>
                <div className={styles.container}>
                        <span className={styles.MovieSubject}>Subject</span>
                        <span className={styles.MovieGrade}>Grade</span>
                </div>
          </div>
        </div>
        <div>
            <div className={styles.cover}>
                <div className={styles.container}>
                        <span className={styles.MovieSubject}>Subject</span>
                        <span className={styles.MovieGrade}>Grade</span>
                </div>
            </div>

            <div className={styles.cover}>
                <div className={styles.container}>
                        <span className={styles.MovieSubject}>Subject</span>
                        <span className={styles.MovieGrade}>Grade</span>
                </div>
            </div>
            <div className={styles.cover}>
                <div className={styles.container}>
                        <span className={styles.MovieSubject}>Subject</span>
                        <span className={styles.MovieGrade}>Grade</span>
                </div>
            </div>
         
          </div>

        </div>
     
    </>
  );
};

export default ExampleComponent;
