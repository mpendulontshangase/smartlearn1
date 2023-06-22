import React from 'react';
import { Select, Space } from 'antd';
import type { SelectProps } from 'antd';

const options: SelectProps['options'] = [
  { label: 'IsiZulu', value: 'option1' },
  { label: 'English', value: 'option2' },
  { label: 'Maths', value: 'option3' },
  // Add more options as needed
];

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

const MultRef: React.FC = () => (
  <Space style={{ width: '100%' }} direction="vertical">
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Please select"
      defaultValue={['option1', 'option2']}
      onChange={handleChange}
      options={options}
    />
  
  </Space>
);

export default MultRef;
