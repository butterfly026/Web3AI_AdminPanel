import XMessage from "@/components/XMessage";
import { CloseCircleOutlined } from "@ant-design/icons";
import {
  ProCard,
  ProForm,
  ProFormDigit,
  ProFormGroup,
  ProFormInstance,
  ProFormList,
  ProFormText,
} from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { request } from "umi";

export default () => {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "profit" } }).then((res: any) => {
      let arr = [];
      for (let i in res?.data) {
        arr.push({ ...{ address: i }, ...res?.data[i] });
      }
      console.log(arr, "arr");
      formRef?.current?.setFieldsValue({ value: arr });
    });
  }, []);

  return (
    <ProCard direction="column" title="ApySetting" bordered headerBordered>
      <ProForm
        formRef={formRef}
        onFinish={async (e) => {
          let objs: any = {};
          e.value.map((res: any) => {
            objs[res?.address] = res;
          });
          request("configs/save", {
            data: { key: "profit", value: JSON.stringify(objs) },
          }).then(() => {
            XMessage.success({ key: "Ok" });
          });
        }}
        layout="horizontal"
      >
        <ProFormList
          name="value"
          creatorButtonProps={{
            creatorButtonText: "add",
          }}
          copyIconProps={{ tooltipText: "copy" }}
          deleteIconProps={{
            Icon: CloseCircleOutlined,
            tooltipText: "delete",
          }}
        >
          <ProFormGroup key="group">
            <ProFormDigit name="address" label="Address" />
            <ProFormDigit
              name="apr_start"
              fieldProps={{
                style: { width: "120px" },
              }}
              label="AprStart"
            />
            <ProFormDigit
              name="apr_end"
              fieldProps={{
                style: { width: "120px" },
              }}
              label="AprEnd"
            />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </ProCard>
  );
};
