import React from 'react'
import Layout from '../../components/Layout'
import ViewM from '../../components/ViewM/ViewM';
import Link from 'next/link';
import { Button } from 'antd';

 function ViewMessage() {
  return (
    <div>
        <Layout>
            <Button>
            <Link href="/ParentDashboard">Back</Link>

            </Button>
            <ViewM/>
        </Layout>
      
    </div>
  )
}

export default ViewMessage;


