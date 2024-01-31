import { MyModalDataContext } from "@/common";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Empty, Space } from "antd";
import { useContext, useEffect, useState } from "react";
import { request } from "umi";

export default ({ props }: any) => {
  const item = useContext(MyModalDataContext);

  const [getDetInfo, setDetInfo] = useState<any>([]);
  const api = {
    show: () => {
      request("users/user_message", {
        data: { id: item?.id },
      }).then((res) => {
        setDetInfo(res?.data);
      });
    },
  };

  const methods = {
    onUser: (data: any) => {
      let json = data?.content ? JSON.parse(data?.content) : {};
      return (
        <>
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              src={json?.fromUser?.avatar}
            />
            <div>
              <div style={{ fontSize: "13px", fontWeight: "450" }}>
                {json?.fromUser?.nickname || "-"}
              </div>
              <div style={{ fontSize: "12px" }}>{json?.fromUser?.address}</div>
            </div>
          </Space>
          <div style={{ paddingTop: "1rem" }}>{json?.content}</div>
        </>
      );
    },
  };
  useEffect(() => {
    api.show();
  }, []);
  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {getDetInfo?.length > 0 ? (
        getDetInfo?.map((res: any, index: number) => {
          return (
            <Card size="small" title={res?.type}>
              {methods?.onUser(res)}
            </Card>
          );
        })
      ) : (
        <Empty />
      )}
    </Space>
  );
};
