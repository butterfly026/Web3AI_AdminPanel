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
import XSelect from "@/components/XSelect";

export default () => {
  const formRef = useRef<ProFormInstance<any>>();

  useEffect(() => {
    request("configs/get", { data: { key: "vip_kill" } }).then((res: any) => {
      let arr = [];
      for (let i in res?.data) {
        arr.push({ ...{ vipval: parseInt(i) }, ...res?.data[i] });
      }
      console.log(arr, "arr");
      formRef?.current?.setFieldsValue({ value: arr });
    });
  }, []);

  return (
    <ProCard direction="column" title="Vip Adjustment" bordered headerBordered>
      <ProForm
        formRef={formRef}
        onFinish={async (e) => {
          let objs: any = {};
          e.value.map((res: any) => {
            objs[res?.vipval] = res;
          });
          console.log(objs, "objs");
          request("configs/save", {
            data: { key: "vip_kill", value: JSON.stringify(objs) },
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
            <XSelect.VipSelect />
            <ProFormDigit
              name="round_start"
              fieldProps={{
                style: { width: "100px" },
              }}
              label="Rounde Start"
            />
            <ProFormDigit
              fieldProps={{
                style: { width: "100px" },
              }}
              name="round_end"
              label="round_end"
            />
            <ProFormText
              name="rate_start"
              label="rate_start"
              fieldProps={{
                addonAfter: "%",
                style: { width: "160px" },
              }}
            />
            <ProFormText
              name="rate_end"
              label="rate_end"
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
