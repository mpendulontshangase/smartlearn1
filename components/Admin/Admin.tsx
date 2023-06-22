import React, { FC, useState, useEffect } from "react";
import { Space, Table, Tag, Button, Input, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";

import { UserOutlined, PlaySquareOutlined } from "@ant-design/icons";
// import DeleteComp from '../Delete';

import styles from "./style.module.css";

import jwtDecode from "jwt-decode";
import { ILearner } from "../../Providers/Learner/context";
import ViewModel from "../ViewLearner";
import { useLearner } from "../../Providers/Learner";
import Link from "next/link";

const AdminDash: FC = () => {
  const { View, DeleteLearner, ViewLearner } = useLearner();

  console.log("zzzzz",View)


  const [searchedText, setSearchedText] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnsType<ILearner> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: ILearner, b: ILearner) => a.name.localeCompare(b.name),
      filteredValue: [searchedText],
      onFilter: (value, record) => {
        const stringValue =
          typeof value === "string" ? value.toLowerCase() : "";
        return (
          String(record?.name).toLowerCase().includes(stringValue) ||
          String(record?.surname).toLowerCase().includes(stringValue)
          //   String(record?Grade).toLowerCase().includes(stringValue) ||
          //   String(record?.Parent).toLowerCase().includes(stringValue)
        );
      },
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      sorter: (a: ILearner, b: ILearner) =>
        a.surname.localeCompare(b.surname),
    },
    {
      title: "Grade",
      dataIndex: "gradeName",
      key: "gradeName",
      //   sorter: (a: ILearner, b: ILearner) => a.Grade.localeCompare(b.Grade),
    },
    {
      title: "Parent",
      key: "parent",
      dataIndex: "parent",
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
            onConfirm={() => deleteButtonLearner(record)}
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
    ViewLearner();

    console.log("this is america",ViewLearner())
  }, []);

  type deleteProp = {
    id: string;
  };

  const deleteButtonLearner = async ({ id }: deleteProp) => {
    DeleteLearner(id);
  };

  // }
  return (
    <div className="main-table-div">
      <div className={styles.tugbtm_div}>
        <div className="teacher-div">
          <Link href="/AdminDashboard">
            <Button
              type="primary"
            //   style={{ background: "#007017", borderColor: "yellow" }}
            >
              Learner
            </Button>
          </Link>
        </div>
      
        <div className="parent-div">
          <Link href="/Parent">
            <Button
              type="primary"
              style={{ background: "#007017", borderColor: "yellow"}}
            >
              Parent
            </Button>
          </Link>
        </div>
        <div className="teacher-div">
          <Link href="/Teacher">
            <Button
              type="primary"
              style={{ background: "#007017", borderColor: "yellow" }}
            >
              Teacher
            </Button>
          </Link>
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

export default AdminDash;
