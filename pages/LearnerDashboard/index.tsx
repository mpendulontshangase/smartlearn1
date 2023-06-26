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
import LearnerDash from "../../components/LearnerDash/LearnerDash";
const { RangePicker } = DatePicker;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const LearnerDashboard: React.FC = () => {
  return (
    <>
  <Layout>
    <LearnerDash/>
  </Layout>
    </>
  );
};
export default LearnerDashboard;
