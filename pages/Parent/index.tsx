import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";

import AdminDash from "../../components/Admin/Admin";
import AdminParent from "../../components/AdminParent/adminparent";

const Parent: React.FC = () => {
  return (
    <>
      <Layout>
        <AdminParent />
      </Layout>
    </>
  );
};
export default () => <Parent />;
