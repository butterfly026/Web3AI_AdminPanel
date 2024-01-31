import { ProFormSwitch, ProFormDigit } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { request } from "umi";
import { message, Space } from "antd";
import XSelect from "@/components/XSelect";

export default function formswitch({
  checked,
  values,
  label,
  placeholder,
  data = {},
  options = [],
  input,
}: any) {
  const [value, setchecked] = useState(checked);
  let inputValue: any = 0;
  return (
    <div>
      <Space>
        <ProFormSwitch
          label={label}
          fieldProps={{
            checked: value,
            onChange: (e: any) => {
              let forData = values;
              if (input && !inputValue) {
                message.warning(placeholder);
                return false;
              }
              if (input) {
                for (let i in data) {
                  data[i] = inputValue;
                }
                forData = { ...data, ...values };
              } else {
                forData = { ...data, ...values };
              }

              request("fake_users/user_setting", {
                data: { ...forData, ...{ value: e ? "1" : "0" } },
              })
                .then(() => {
                  message.success("操作成功");
                  setchecked(e ? true : false);
                })
                .catch((err) => {
                  setchecked(checked);
                  console.log(err);
                });
              console.log(e, "ee");
            },
          }}
        />
        {input ? (
          <XSelect.AmountSelect
            label=""
            placeholder={placeholder}
            options={options}
            fieldProps={{
              onChange: (e: any) => {
                inputValue = e;
                console.log(e, "eeeee");
              },
            }}
          />
        ) : (
          ""
        )}
      </Space>
    </div>
  );
}
