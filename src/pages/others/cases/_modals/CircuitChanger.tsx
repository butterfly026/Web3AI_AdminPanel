import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
} from "@/common";
import { CasesStatusEnum } from "@/enums";
import { ProFormInstance } from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";
import { request } from "umi";

export const Circuit = (props: any) => {
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
        request("cases/close", {
          data: { ...values, id: item?.id },
        }).then((res) => {
          props?.actions?.list();
        });
        return Promise.resolve();
      }}
    >
      <MyEnumFormRadioGroup
        label="Status"
        name="status"
        items={CasesStatusEnum}
      />
    </MyModalForm>
  );
};
