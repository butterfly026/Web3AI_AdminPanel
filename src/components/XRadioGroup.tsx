import { MyProFormRadioGroup } from "@/common";

export default {
  SysPermissionsType: () => {
    return (
      <MyProFormRadioGroup
        name="type"
        label="Menu Type"
        rules={[
          {
            required: true,
            message: "Please input type!",
          },
        ]}
        options={[
          {
            label: "Directory",
            value: "Directory",
          },
          {
            label: "Page",
            value: "Page",
          },
          {
            label: "Button",
            value: "Button",
          },
        ]}
      />
    );
  },
};
