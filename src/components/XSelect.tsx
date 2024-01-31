import { MyProFormSelect } from "@/common";
import { ProFormSelect } from "@ant-design/pro-components";
import { request } from "umi";

export default {
  SysRoles: ({ title, ...rest }: any) => {
    return (
      <MyProFormSelect
        name="roles_id"
        label={title || "ChooseRole"}
        placeholder="Please select role"
        request={async () => {
          const res = await request("sys_roles/select", {
            method: "POST",
          });
          if (res.code === 0) return res.data;
        }}
        mode="multiple"
        allowClear
        fieldProps={{
          fieldNames: {
            label: "Name",
            value: "id",
          },
        }}
        {...rest}
      />
    );
  },
  VipSelect: ({ title, name = "vipval", fieldProps, ...rest }: any) => {
    return (
      <ProFormSelect
        name={name}
        label={title || "Select Vip"}
        placeholder="Select Vip"
        request={async () => {
          const res = await request("vips/select", {
            method: "POST",
          });
          if (res.code === 0) return res?.data;
        }}
        allowClear
        fieldProps={{
          ...{
            fieldNames: {
              label: "label",
              value: "value",
            },
          },
          ...fieldProps,
        }}
        {...rest}
      />
    );
  },
  MessageSelect: ({ title, fieldProps, ...rest }: any) => {
    return (
      <ProFormSelect
        label={title || "Reason for rejection"}
        placeholder="Please select the reason for rejection"
        request={async () => {
          return [
            {
              label:
                "The information does not match the photo, please resubmit Thank you",
              value: "1",
            },
            {
              label:
                "The age is under the legal age and cannot be authenticated, thank you",
              value: "2",
            },
            {
              label: "The certificate is invalid, please re-upload, thank you!",
              value: "3",
            },
            {
              label:
                "The photo is not clear, please retake it and upload it, thank you!",
              value: "4",
            },
              {
              label:
                "Please change the ID background and take another photo, thank you!",
              value: "5",
            },
          ];
        }}
        allowClear
        fieldProps={fieldProps}
        {...rest}
      />
    );
  },
  LeverageSelect: ({ name, title, fieldProps, ...rest }: any) => {
    return (
      <ProFormSelect
        name={name || "leverage"}
        label={title || "leverage"}
        placeholder="leverage"
        allowClear
        fieldProps={fieldProps}
        options={[
          {
            value: 1,
            label: "1x",
          },
          {
            value: 5,
            label: "5x",
          },
          {
            value: 10,
            label: "10x",
          },
          {
            value: 20,
            label: "20x",
          },
          {
            value: 40,
            label: "40x",
          },
          {
            value: 60,
            label: "60x",
          },
          {
            value: 80,
            label: "80x",
          },
          {
            value: 100,
            label: "100x",
          },
          {
            value: 120,
            label: "120x",
          },
          {
            value: 125,
            label: "125x",
          },
        ]}
        {...rest}
      />
    );
  },
  DurationSelect: ({ name, title, fieldProps, ...rest }: any) => {
    return (
      <ProFormSelect
        name={name || "duration"}
        label={title || "Duration"}
        placeholder="Duration"
        allowClear
        fieldProps={fieldProps}
        options={[
          {
            value: 3,
            label: "3days",
          },
          {
            value: 7,
            label: "7days",
          },
          {
            value: 15,
            label: "15days",
          },
          {
            value: 30,
            label: "30days",
          },
          {
            value: 60,
            label: "60days",
          },
          {
            value: 90,
            label: "90days",
          },
          {
            value: 180,
            label: "180days",
          },
          {
            value: 360,
            label: "360days",
          },
        ]}
        {...rest}
      />
    );
  },
  AmountSelect: ({
    name = "",
    label = "",
    options = [],
    fieldProps,
    ...rest
  }: any) => {
    return (
      <ProFormSelect
        name={name}
        label={label}
        placeholder="Duration"
        allowClear
        fieldProps={fieldProps}
        options={options}
        {...rest}
      />
    );
  },
};
