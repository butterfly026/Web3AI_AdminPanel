import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
} from "@/common";
import XSelect from "@/components/XSelect";
import { UsersIdentityStatusEnum } from "@/enums";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    console.log("update item", item);
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
        label="Address"
        name="address"
        placeholder="Address"
        readonly
        rules={[{ required: true, message: "Address!" }]}
      />
      <MyEnumFormRadioGroup
        label="ProfileStatus"
        name="profile_status"
        items={UsersIdentityStatusEnum}
      />
      <XSelect.MessageSelect
        name="profile_error_message"
        label="ProfileErrorMessage"
        rules={[
          ({ getFieldValue }: any) => ({
            validator(_: any, value: any) {
              if (!value && getFieldValue("profile_status") === "Failed") {
                return Promise.reject(
                  new Error("Please select a reason for rejection!")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
    </MyModalForm>
  );
};
