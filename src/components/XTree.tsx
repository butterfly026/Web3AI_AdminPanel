import { MyProFormTree } from "@/common";
import { Form } from "antd";
import { useEffect, useState } from "react";
import { request } from "umi";

export default {
  SysPermissions: ({ ...rest }: any) => {
    const [treeData, setTreeData] = useState<any[]>([]);

    useEffect(() => {
      request("sys_permissions/tree", { method: "post" }).then((res) => {
        setTreeData(res.data);
      });
    }, []);

    return (
      <Form.Item name="permissions_ids" label="Select Menu">
        <MyProFormTree
          fieldNames={{ title: "name", key: "id", children: "children" }}
          treeData={treeData}
          {...rest}
        />
      </Form.Item>
    );
  },
};
