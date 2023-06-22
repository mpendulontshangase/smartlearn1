import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import AdminDash from "../../components/Admin/Admin";
import AdminTeacher from "../../components/AdminTeacher/adminteacher";

const Teacher: React.FC = () => {
  return (
    <>
      <Layout>
        <AdminTeacher />
      </Layout>
    </>
  );
};
export default () => <Teacher />;
