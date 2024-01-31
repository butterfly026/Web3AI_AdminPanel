import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useParams, request, Outlet, history } from "umi";
import { Tag, Space, Row, Col, Avatar, Button } from "antd";
import { useEffect, useState } from "react";
import MyStatisticCard from "@/common/components/MyStatisticCard";
import MyProCard from "@/common/components/MyProCard";
import { LeftOutlined } from "@ant-design/icons";

export default () => {
  const [data, setData]: any = useState({});
  const params = useParams();

  useEffect(() => {
    request("pledges/show", {
      data: { id: params.id },
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <ProCard>
        <PageContainer
          title={`Pledges #` + data?.model?.id}
          subTitle={
            <>
              <Avatar src={data?.model?.user?.avatar} />
              {data?.model?.user?.address}
            </>
          }
          tags={<Tag color="blue">{data?.model?.status}</Tag>}
          extra={[
            <Button
              key="1"
              icon={<LeftOutlined />}
              onClick={() => history.push(`/ai_trade/pledges`)}
            >
              Back
            </Button>,
          ]}
        />
      </ProCard>
      <Space direction="vertical">
        <MyStatisticCard items={data?.statistics} />
        <ProCard>
          <Row>
            <Col span={24}>
              <MyProCard
                url={`/ai_trade/pledges/${params.id}/`}
                tabs={["details", "profits"]}
              />
            </Col>
            <Col span={24} style={{ padding: "0px 20px 0 20px" }}>
              <Outlet context={data} />
            </Col>
          </Row>
        </ProCard>
      </Space>
    </>
  );
};
