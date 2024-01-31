import { ProFormTreeSelect } from "@ant-design/pro-form";

export const MyProFormTreeSelect = ({
  name,
  label,
  placeholder,
  request,
  ...rest
}: any) => {
  return (
    <ProFormTreeSelect
      name={name}
      label={label}
      placeholder={placeholder}
      request={request}
      width={300}
      allowClear
      fieldProps={{
        fieldNames: {
          label: "title",
          value: "id",
          children: "children",
          showSearch: true,
          treeNodeFilterProp: "title",
        },
        treeDefaultExpandAll: true,
      }}
      {...rest}
    />
  );
};
