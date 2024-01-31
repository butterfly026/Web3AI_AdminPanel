import { MyModalDataContext, MyModalForm } from '@/common';
import {
  ProFormInstance,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useContext, useEffect, useState, useRef } from 'react';
import { request } from 'umi';
import MDEditor from '@uiw/react-md-editor';

export const Answer = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);
  const [value, setValue] = useState<string>(
    `Dear **${props.record?.user?.full_name}**`
  );
  console.log(props);
  const handleChange = (newValue?: string) => {
    // 替换所有的 Markdown 特殊字符
    // const safeValue = newValue.replace(/[*_~`#]/g, '');
    setValue(newValue || '');
  };

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        request('cases/submit', {
          data: { ...values, id: item?.id, answer: value },
        }).then((res) => {
          props?.actions?.list();
        });
        return Promise.resolve();
      }}
    >
      <MDEditor
        value={value}
        onChange={handleChange}
        highlightEnable={false}
        data-color-mode='light'
      />
    </MyModalForm>
  );
};
