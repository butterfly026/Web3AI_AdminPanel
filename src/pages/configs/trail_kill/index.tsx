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
    request("configs/get", { data: { key: "trail_kill" } }).then((res) => {
      formRef?.current?.setFieldsValue({ value: res.data });
    });
  }, []);

  return (
    <ProCard direction="column" title="Trail Adjustment" bordered headerBordered>
      <ProForm
        formRef={formRef}
        onFinish={async (e) => {
          request("configs/save", {
            data: { key: "trail_kill", value: JSON.stringify(e.value) },
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
            <ProFormDigit
              name="round_start"
              label="Rounde Start"
              fieldProps={{
                style: {
                  width: "150px",
                },
              }}
            />
            <ProFormDigit
              name="round_end"
              label="Round End"
              fieldProps={{
                style: {
                  width: "150px",
                },
              }}
            />
            <ProFormText
              name="rate_start"
              label="Rate Start"
              fieldProps={{
                addonAfter: "%",
                style: {
                  width: "180px",
                },
              }}
            />
            <ProFormText
              name="rate_end"
              label="rate_end"
              fieldProps={{
                addonAfter: "%",
                style: {
                  width: "180px",
                },
              }}
            />
            <ProFormSwitch name="enable" />
          </ProFormGroup>
        </ProFormList>
      </ProForm>
    </ProCard>
  );
};
