import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import AdminDash from "../../components/Admin/Admin";

const AdminDashboard: React.FC = () => {
  return (
    <>
      <Layout>
        <AdminDash />
      </Layout>
    </>
  );
};
export default () => <AdminDashboard />;
