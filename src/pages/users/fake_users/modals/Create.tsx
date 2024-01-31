import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
} from "@/common";
import XSelect from "@/components/XSelect";
import { UsersIdentityStatusEnum } from "@/enums";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export const Create = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.store(values);
        return Promise.resolve();
      }}
    >
      <ProFormText
        label="NumberOfPeople"
        name="num"
        placeholder="Please enter the number of people! Such as: 8 people"
        rules={[{ required: true, message: "Please enter the number of people!" }]}
      />
    </MyModalForm>
  );
};
