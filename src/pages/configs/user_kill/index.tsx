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
  ProFormSwitch,
} from "@ant-design/pro-components";
import { useEffect, useRef } from "react";
import { request } from "umi";

export default () => {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "user_kill" } }).then((res: any) => {
      let arr = [];
      for (let i in res?.data) {
        arr.push({ ...{ address: i }, ...res?.data[i] });
      }
      console.log(arr, "arr");
      formRef?.current?.setFieldsValue({ value: arr });
    });
  }, []);

  return (
    <ProCard direction="column" title="User Adjustment" bordered headerBordered>
      <ProForm
        formRef={formRef}
        onFinish={async (e) => {
          let objs: any = {};
          e.value.map((res: any) => {
            objs[res?.address] = res;
          });
          request("configs/save", {
            data: { key: "user_kill", value: JSON.stringify(objs) },
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
            <ProFormText name="address" label="Address" />
            <ProFormDigit
              name="round_start"
              fieldProps={{
                style: { width: "100px" },
              }}
              label="RoundeStart"
            />
            <ProFormDigit
              name="round_end"
              fieldProps={{
                style: { width: "100px" },
              }}
              label="RoundEnd"
            />
            <ProFormText
              name="rate_start"
              label="RateStart"
              fieldProps={{
                addonAfter: "%",
                style: { width: "120px" },
              }}
            />
            <ProFormText
              name="rate_end"
              label="RateEnd"
              fieldProps={{
                addonAfter: "%",
                style: { width: "120px" },
              }}
            />
            <ProFormSwitch name="enable" />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </ProCard>
  );
};
