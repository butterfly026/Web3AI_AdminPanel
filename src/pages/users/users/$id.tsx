import MyProCard from "@/common/components/MyProCard";
import MyStatisticCard from "@/common/components/MyStatisticCard";
import { LeftOutlined } from "@ant-design/icons";
import { PageContainer, ProCard } from "@ant-design/pro-components";
import { Col, Row, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link, Outlet, request, useParams } from "umi";

export default () => {
  const [data, setData]: any = useState({});
  const params = useParams();

  useEffect(() => {
    request("users/show", {
      data: { id: params.id },
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Space direction="vertical" size="middle">
      <ProCard>
        <PageContainer
          title={[
            <Link to="/users/users" style={{ marginRight: 12 }}>
              <LeftOutlined />
            </Link>,
            data?.model?.full_name ?? "NO_NAME",
          ]}
          subTitle={data?.model?.address ?? "-"}
          tags={<Tag color="blue">{data?.model?.status}</Tag>}
          extra={[]}
        />
      </ProCard>
      <ProCard>
        <MyStatisticCard items={data?.statistics} />
        <Row>
          <Col span={24}>
            <MyProCard url={`/users/${params.id}/`} tabs={["details"]} />
          </Col>
          <Col span={24} style={{ padding: "0px 20px 0 20px" }}>
            <Outlet context={data} />
          </Col>
        </Row>
      </ProCard>
    </Space>
  );
};
