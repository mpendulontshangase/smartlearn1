import { PlusOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Input,
} from "antd";
import Link from "next/link";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import ParentDash from "../../components/ParentDash/ParentDash";
import WithoutTokenRedirect from "../../components/HOC/HOC";
const { RangePicker } = DatePicker;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const ParentDashboard: React.FC = () => {
  return (
    <>
  <Layout>
    <ParentDash/>
  </Layout>
    </>
  );
};
export default ParentDashboard;
