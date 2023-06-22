import React, { FC, useState, useEffect } from "react";
import { Space, Table, Tag, Button, Input, Popconfirm, message } from "antd";
import { ColumnsType } from "antd/es/table";

import { UserOutlined, PlaySquareOutlined } from "@ant-design/icons";
// import DeleteComp from '../Delete';

import styles from "../Admin/style.module.css";

import jwtDecode from "jwt-decode";
import { IParent } from "../../Providers/Parent/context";
import ViewModel from "../ViewParent";
import { useParent } from "../../Providers/Parent";
import Link from "next/link";

const AdminParent: FC = () => {
  const { View, DeleteParent, ViewParent } = useParent();

  const [loginUser, setUsername] = useState("");

  const [searchedText, setSearchedText] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const columns: ColumnsType<IParent> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: IParent, b: IParent) => a.name.localeCompare(b.name),
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
      sorter: (a: IParent, b: IParent) =>
        a.surname.localeCompare(b.surname),
    },
    {
      title: "Relationship",
      dataIndex: "RelationshipName",
      key: "RelationshipName",
      //   sorter: (a: IParent, b: IParent) => a.Grade.localeCompare(b.Grade),
    },
    {
      title: "Learner",
      key: "learner",
      dataIndex: "learner",
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
            title="Delete Parent"
            description="Are you sure to delete this Parent?"
            onConfirm={() => deleteButtonParent(record)}
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
    ViewParent();
  }, []);

  type deleteProp = {
    id: string;
  };

  const deleteButtonParent = async ({ id }: deleteProp) => {
    DeleteParent(id);
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
            //   style={{ background: "#007017", borderColor: "yellow" }}
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

export default AdminParent;
