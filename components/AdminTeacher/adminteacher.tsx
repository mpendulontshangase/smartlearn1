import React, { FC, useState, useEffect } from "react";
import { Space, Table, Tag, Button, Input, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";

import { UserOutlined, PlaySquareOutlined } from "@ant-design/icons";
// import DeleteComp from '../Delete';

import styles from "../Admin/style.module.css";

import jwtDecode from "jwt-decode";
import { ITeacher } from "../../Providers/Teacher/context";
import ViewModel from "../VIewTeacher";
import { useTeacher } from "../../Providers/Teacher";
import Link from "next/link";
import AddTeacher from "../AddTeacher/AddTeacher";

const AdminTeacher: FC = () => {
  const { View, DeleteTeacher, ViewTeacher } = useTeacher();



  // const [loginUser, setUsername] = useState("");

  const [searchedText, setSearchedText] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnsType<ITeacher> = [
    {
  title: "Name",
  dataIndex: "name",
  key: "name",
  sorter: (a: ITeacher, b: ITeacher) => {
    const nameA = a?.name || "";
    const nameB = b?.name || "";
    return nameA.localeCompare(nameB);
  },
  filteredValue: [searchedText],
  onFilter: (value, record) => {
    const stringValue = typeof value === "string" ? value.toLowerCase() : "";
    return (
      String(record?.name).toLowerCase().includes(stringValue) ||
      String(record?.surname).toLowerCase().includes(stringValue)
    );
  },
},

    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      sorter: (a: ITeacher, b: ITeacher) =>
        a.surname.localeCompare(b.surname),
    },
    {
        title: "Grade",
        dataIndex: "gradeName",
        key: "gradeName",
        sorter: (a: ITeacher, b: ITeacher) => {
          const gradeA = a?.grade || "";
          const gradeB = b?.grade || "";
          return gradeA.localeCompare(gradeB);
        },
      },
      
    {
      title: "Subject",
      key: "subjectDisplay",
      dataIndex: "subjectDisplay",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ViewModel
           id={record.id}
           name={record.name}
           surname={record.surname}
           secondName={record.secondName}
           idNumber={record.idNumber}
           phoneNumber={record.phoneNumber}
           emailAddress={record.emailAddress}
           streetAddress={record.streetAddress}
           gender={record.gender}
           dateOfBirth={record.dateOfBirth}
           password={record.password}
           age={record.age}
          
          />
          <Popconfirm
            title="Delete Learner"
            description="Are you sure to delete this Learner?"
            onConfirm={() => deleteButtonTeacher(record)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button className={styles.deletebutton}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
      width: 200,
    },
  ];

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    message.error("user not Deleted");
  };

  useEffect(() => {
    ViewTeacher();
  }, []);

  type deleteProp = {
    id: string;
  };

  const deleteButtonTeacher = async ({ id }: deleteProp) => {
    DeleteTeacher(id);
  };

  // }
  return (
    <div className="main-table-div">
        
      <div className={styles.tugbtm_div}>
        
        <div className="teacher-div">
          <Link href="/AdminDashboard">
            <Button
              type="primary"
              style={{ background: "#007017", borderColor: "yellow" }}
            >
              Learner
            </Button>
          </Link>
        </div>
       
        <div className="parent-div">
          <Link href="/Parent">
            <Button
              type="primary"
              style={{ background: "#007017", borderColor: "yellow" }}
            >
              Parent
            </Button>
            
          </Link>
        </div>

       
        <div className="teacher-div" style={{display:"grid", gap:"10px"}}>
          <Link href="/Teacher">
            <Button
              type="primary"
            //   style={{ background: "#007017", borderColor: "yellow" }}
            >
              Teacher
            </Button>
          </Link>
         
        </div>
        <div>
        <AddTeacher/>

        </div>
      </div>
      <Table
        columns={columns}
        dataSource={View}
        pagination={{
          current: page,
          pageSize: pageSize,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
      ;
    </div>
  );
};

export default AdminTeacher;
