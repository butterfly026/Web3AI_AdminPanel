import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";
import { MyEnumFormSelect } from "@/common/components/MyEnumFormSelect";
import { UsersIdentityStatusEnum } from "@/enums";
import { Col, Row, Tabs } from "antd";
import { ProCard, ProForm } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { history } from "umi";
import { SystemMessages } from "./contents/SystemMessages";
import { PrivateMessages } from "./contents/PrivateMessages";


const { TabPane } = Tabs;

export default () => {
  const onTabChanged = (tabKey: string) => {

  }
  return (
    <>
      <Tabs onChange={onTabChanged} type="card">
        <TabPane tab="Private Messages" key="1">
          <Row>
            <Col span="24"            
              style={{ paddingBottom: '20px', height: '100%', maxHeight: 'calc(100vh-150px)' }}>
              <PrivateMessages></PrivateMessages>
            </Col>
          </Row>
        </TabPane>
        <TabPane tab="System Messages" key="2">
          <Row>
            <Col span="24"            
              style={{ paddingBottom: '20px', height: '100%', maxHeight: 'calc(100vh-150px)' }}>
              <SystemMessages></SystemMessages>
            </Col>
          </Row>
        </TabPane>
      </Tabs>

    </>
  );
};
