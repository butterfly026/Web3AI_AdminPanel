import { MyModalDataContext, MyModalForm } from "@/common";
import MyUpload from "@/common/components/MyUpload";
import { getImgUrl } from "@/common/utils/paramsHelper";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { Form } from "antd";
import { useContext, useEffect, useRef } from "react";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText
        label="NickName"
        name="nickname"
        placeholder="nickname"
        rules={[{ required: true, message: "NickName!" }]}
      />
      <ProFormText
        label="Email"
        name="email"
        placeholder="Email"
        rules={[{ required: true, message: "email!" }]}
      />
      <Form.Item
        label="Avatar"
        name="avatar"
        rules={[{ required: true, message: "Please upload an avatar!" }]}
      >
        <MyUpload
          defaultFileList={[{ url: getImgUrl(item?.avatar) }]}
          onChangeFile={(e: any) => {
            formRef?.current?.setFieldsValue({ avatar: e?.url });
          }}
        />
      </Form.Item>
    </MyModalForm>
  );
};
