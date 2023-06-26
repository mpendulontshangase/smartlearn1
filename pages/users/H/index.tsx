// import React, { useEffect, useState } from "react";
// import { useHomework } from "../../../Providers/Homework";
// import { getToken } from "../../../utils/Decoder";
// import styles from './style.module.css'
// import { CheckCircleOutlined } from "@ant-design/icons";

// const H = () => {
//   const { View,ViewHomework } = useHomework();
//   const [filteredHomeworks, setFilteredHomeworks] = useState([]);
//   const [clickedId, setClickedId] = useState(null);
//   const grade = 'Grade 8'; 
//   const subject = ["English"]; 

//   useEffect(() => {
//     ViewHomework();
//   }, []);

//   useEffect(() => {
//     if (ViewHomework.length > 0) {
//       const filtered = View.filter(
//         (homework) =>
//           homework.gradeName === grade && 
//           homework.subjectDisplay === subject 
//       );
//       setFilteredHomeworks(filtered);
//     }
//   }, [ViewHomework, grade, subject]);

//   const handleClick = (id) => {
//     setClickedId(id);
//     // Handle the click event for the homework item with the given id
//     // You can perform any additional logic or update the state as needed
//   };

//   return (
//     <>
//       <div style={{ display: "flex" }}>
//         <div className={styles.cover}>
//           <div className={styles.container}>
//             {filteredHomeworks.map((homework) => (
//               <div
//                 key={homework.id}
//                 className={`${styles.homework} ${
//                   clickedId === homework.id ? styles.clicked : ""
//                 }`}
//               >
//                 <p className={styles.subject}>Subject: {homework.subjectDisplay}</p>
//                 <p className={styles.grade}>Grade: {homework.gradeName}</p>
//                 <div className={styles.details}>
//                   <p className={styles.title}>New Homework</p>
//                   <br />
//                   <p onClick={() => handleClick(homework.id)}>
//                     {homework.homeworkDescription}{" "}
//                     <CheckCircleOutlined
//                       className={clickedId === homework.id ? styles.blue : ""}
//                     />
//                   </p>
//                   <p>{homework.file}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default H;

import React, { useEffect, useState } from "react";
import { useHomework } from "../../../Providers/Homework";
import { getToken } from "../../../utils/Decoder";
import styles from './style.module.css';
import { CheckCircleOutlined } from "@ant-design/icons";

const AllHomeworks = () => {
  const { View, ViewHomework } = useHomework();
  const [homeworks, setHomeworks] = useState([]);

  useEffect(() => {
    ViewHomework();
  }, []);

  useEffect(() => {
    setHomeworks(View);
  }, [View]);

  return (
    <div className={styles.container}>
      {homeworks.map((homework) => (
        <div key={homework.id} className={styles.homework}>
          <p className={styles.subject}>Subject: {homework.subjectDisplay}</p>
          <p className={styles.grade}>Grade: {homework.gradeName}</p>
          <div className={styles.details}>
            <p className={styles.title}>New Homework</p>
            <br />
            <p>
              {homework.homeworkDescription}{" "}
              <CheckCircleOutlined className={styles.blue} />
            </p>
            <p>{homework.file}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllHomeworks;

