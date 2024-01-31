import { ArrowLeftOutlined, SaveOutlined } from '@ant-design/icons';
import { ProCard } from '@ant-design/pro-components';
import ProForm from '@ant-design/pro-form';
import { Button, Space } from 'antd';
export default ({ children, formRef, title, onFinish, useTitle }: any) => {
  return (
    <ProCard
      title={
        useTitle ? (
          <Button type='link' onClick={() => history.go(-1)}>
            <ArrowLeftOutlined />
            {title}
          </Button>
        ) : (
          ''
        )
      }
      type='inner'
      bordered
      headStyle={{ backgroundColor: '#f9f9f9' }}
    >
      <div style={{ width: '1000px', padding: '1rem 0', margin: '0 auto' }}>
        <ProForm
          formRef={formRef}
          submitter={{
            render: () => {
              return (
                <Space>
                  <Button type='primary' htmlType='submit'>
                    <SaveOutlined />
                    保存
                  </Button>
                  <Button onClick={() => history.go(-1)}>
                    <ArrowLeftOutlined />
                    返回
                  </Button>
                </Space>
              );
            },
          }}
          onFinish={onFinish}
        >
          {children}
        </ProForm>
      </div>
    </ProCard>
  );
};
