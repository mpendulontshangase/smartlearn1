import React from "react";
// import { RestfulProvider } from "restful-react";
import { useRouter } from "next/router";
import { UserProvider } from "../Providers/User";
import { RestfulProvider } from "restful-react";
import { LearnerProvider } from "../Providers/Learner";
import { TeacherProvider } from "../Providers/Teacher";
import { ParentProvider } from "../Providers/Parent";
import { HomeworkProvider } from "../Providers/Homework";
import { MessageProvider } from "../Providers/Messages";

function App({ Component, pageProps }) {
 


  return (
    <>
      <RestfulProvider base="https:/localhost:44311/api/services/app/">
        <UserProvider>
          <LearnerProvider>
            <ParentProvider>
              <TeacherProvider>
                <HomeworkProvider>
                  <MessageProvider>
                <Component {...pageProps} />

                  </MessageProvider>
                </HomeworkProvider>
              </TeacherProvider>
            </ParentProvider>
          </LearnerProvider>
        </UserProvider>
      </RestfulProvider>
    </>
  );
}

export default App;
