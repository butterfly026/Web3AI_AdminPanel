import { MyButtons, MyColumns, MyPagination, processYesOrNo, useListPage } from "@/common";
import { MyEnumFormSelect } from "@/common/components/MyEnumFormSelect";
import { UsersIdentityStatusEnum, YesOrNoEnum } from "@/enums";
import { Button, Popconfirm, Row, Tabs, message } from "antd";
import { ProCard, ProForm } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { history, request } from "umi";
import { SendSystemMessage } from "../modals/SendSystemMessage";
import styles from '@/common/styles';
import { QuestionCircleOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

export const SystemMessages = () => {
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "broadcast_message",
    defaultParams: { s: {} },
    otherApi: {
      disable: (values: any) => {
        request("broadcast_message/disable", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
    }
  });


  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.common({ title: "Title", key1: "title" }),
      MyColumns.content({ title: "Content", key1: "content", key2: "url" }),
      MyColumns.common({ title: "Creator", key1: "admin_name"}),
      MyColumns.enumTag({
        title: "Active",
        key1: "active",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),    
      MyColumns.dateTime({}),
      {
        title: "Operate",
        key: "action",
        align: "right",
        fixed: "right",
        valueType: "option",
        render: (_: any, item: any) => [
          <MyButtons.ToggleDisableNotify
            active={item?.active}
            key={"ToggleDisable_" + item.id}
            onConfirm={() => {
              if(item?.active == 1)
                actions?.disable({ id: item?.id, active: 0});
              else
                actions?.disable({ id: item?.id, active: 1});
            }}
          />,
        ],
      },
    ] as ProColumns<any, "text">[],
  };

  const sendMessage = () => {
    modalRef.current?.showModal({
      title: "SendMessage",
      child: <SendSystemMessage actions={actions} />,
    });
  }

  return (
    <>
      <PageContainer
        title="System Messages"
        style={{ height: '100%', maxHeight:'100%' }}
        content={
          <ProCard>
            {/* <QueryFilter {...search}> */}
              {/* <ProFormText name="title" label="Title" />
              <ProFormText name="content" label="Content" /> */}
              <Row justify="end" align="middle">
                <Button type="primary" onClick={() => sendMessage()}>New Message</Button>
              </Row>
            {/* </QueryFilter> */}
            <Row justify="end" align="middle" style={{paddingRight: '24px'}}>
              {/* <Button style={{marginRight: '10px'}} onClick={() => selectAll()}>
                {
                  checkedId?.length === pagination?.meta?.total ? "UnSelect All" : "Select All"
                }
              </Button> */}
              
            </Row>
            <ProTable
              {...table}
              {...tableProps}
              expandable={{ defaultExpandAllRows: true }}
            />
            <MyPagination 
              key="page" 
              notFixedPos={true}
              {...pagination} />
          </ProCard>
        }
      />
    </>
  );
};
