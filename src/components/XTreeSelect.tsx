import { MyProFormTreeSelect } from "@/common";
import { request } from "umi";

export default {
  SysPermissions: () => {
    const doRequest = async () => {
      const res = await request("sys_permissions/list", { method: "post" });
      if (res.code === 0) return res.data;
    };

    return (
      <MyProFormTreeSelect
        name="parent_id"
        label="Parent Menu"
        placeholder="Please select the parent menu, if not selected, it will be the root node"
        request={doRequest}
      />
    );
  },
};
