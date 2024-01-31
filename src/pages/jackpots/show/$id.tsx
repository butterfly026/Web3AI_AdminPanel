import { PageContainer, ProCard } from "@ant-design/pro-components";
import { useParams, history, request, Outlet } from "umi";
import { Button, Tag, Space, Row, Col, Tabs } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
// import styles from "@/common/styles";
import MyStatisticCard from "@/common/components/MyStatisticCard";
import MyProCard from "@/common/components/MyProCard";
// import MyEnumTag from "@/common/components/MyEnumTag";
import { JackpotsStatusEnum } from "@/enums";

export default () => {
  const [data, setData]: any = useState({});
  const params = useParams();

  useEffect(() => {
    request("jackpots/show", {
      data: { id: params.id },
    }).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <>
      <ProCard>
        <PageContainer
          title={`Jackpots #${data?.model?.id}`}
          //   tags={
          //     <MyEnumTag items={JackpotsStatusEnum} value={data?.model?.status} />
          //   }
          extra={[
            <Button
              key="1"
              icon={<LeftOutlined />}
              onClick={() => history.push(`/jackpots`)}
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
                url={`/jackpots/show/${params.id}/`}
                tabs={["users", "logs"]}
              />
            </Col>
            <Col span={24} style={{ padding: "0px 20px 0 20px" }}>
              <Outlet />
            </Col>
          </Row>
        </ProCard>
      </Space>
    </>
  );
};
