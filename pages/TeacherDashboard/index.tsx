import React from "react";
import Homework from "../../components/Homework/Homework";
import Layout from "../../components/Layout";
import Test from "../../components/Test/Test";
import TestMark from "../../components/Marks/TestMark";
import HomeworkMark from "../../components/Marks/HomeworkMark";
import Link from "next/link";
import { Button } from "antd";
import TDRecords from "../../components/TDRecords/tdecord";

function TeacherDash() {
  return (
    <div>
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
        
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "20px",
            }}
          >
            <div>
              <Homework />
            </div>
            {/* <div>
              <Test />
            </div> */}
          </div>
          {/* <div>
            <Link href="/Message">
              <Button style={{backgroundColor:"green",color:"white"}}>
                Messages
              </Button>
            </Link>
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              gap: "20px",
            }}
          >
            
            {/* <div>
              <TestMark />
            </div>
            <div>
              <HomeworkMark />
            </div> */}
             <div>
            <Link href="/Message">
              <Button style={{backgroundColor:"green",color:"white"}}>
                Messages
              </Button>
            </Link>
          </div>
          </div>
        </div>
        <div>
          <TDRecords/>
        </div>
      </Layout>
    </div>
  );
}

export default TeacherDash;
