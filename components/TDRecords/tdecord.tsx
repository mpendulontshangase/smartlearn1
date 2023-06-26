import React, { FC, useState, useEffect } from "react";
import { Space, Table, Tag, Button, Input, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";

import { UserOutlined, PlaySquareOutlined } from "@ant-design/icons";
// import DeleteComp from '../Delete';

import styles from "../Admin/style.module.css";

import jwtDecode from "jwt-decode";
import { IHomework } from "../../Providers/Homework/context";
import ViewModel from "../VIewTR";
import { useHomework } from "../../Providers/Homework";
import Link from "next/link";

const TDRecords: FC = () => {
  const { View, DeleteHomework, ViewHomework } = useHomework();

  const [loginUser, setUsername] = useState("");

  const [searchedText, setSearchedText] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnsType<IHomework> = [
    {
        title: "Description",
        dataIndex: "homeworkDescription",
        key: "homeworkDescription",
        sorter: (a: IHomework, b: IHomework) =>
          a.homeworkDescription.localeCompare(b.homeworkDescription),
      },
    
      {
        title: "Grade",
        dataIndex: "gradeName",
        key: "gradeName",
     
      },
    
    {
        
      title: "Subject",
      dataIndex: "subjectDisplay",
      key: "subjectDisplay",
      sorter: (a: IHomework, b: IHomework) => a.subject.localeCompare(b.subject),
      filteredValue: [searchedText],
   
    },
      {
        title: "Due Date",
        dataIndex: "due_Date",
        key: "due_Date",
    
      },
    

      

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <ViewModel
            id={record.id}
            homeworkDescription={record.homeworkDescription}
            due_Date={record.due_Date}
        
            grade={record.grade}
            subject={record.subject}
            file={record.file}
            teacher_Id={record.teacher_Id}
         
       
          />
          <Popconfirm
            title="Delete Homework"
            description="Are you sure to delete this Homework?"
            onConfirm={() => deleteButtonHomework(record)}
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
    ViewHomework();
  }, []);

  type deleteProp = {
    id: string;
  };

  const deleteButtonHomework = async ({ id }: deleteProp) => {
    DeleteHomework(id);
  };

  // }
  return (
    <div className="main-table-div">
    
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

export default TDRecords;
