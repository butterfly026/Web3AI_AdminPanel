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

import styles from '@/common/styles';
import { QuestionCircleOutlined } from "@ant-design/icons";
import { SendPrivateMessage } from "../modals/SendPrivateMessage";

const { TabPane } = Tabs;

export const PrivateMessages = () => {
  const { modalRef, actions, params, pagination, search, setResData, table } = useListPage({
    baseUri: "sys_messages",
    defaultParams: { s: {} },
    otherApi: {
      addprivatemsg: (values: any) => {
        request("sys_messages/addprivatemsg", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
      list: (values: any) => {
        request("sys_messages/listprivatemsg", {
          data: values,
        }).then((res: any) => {
          message.success("Success");
          modalRef.current?.hideModal();
          setResData(res);
        });
      },
      disable: (values: any) => {
        request("sys_messages/disable", {
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
      MyColumns.user({title: 'User', key1: 'user'}),
      MyColumns.common({ title: "InviteCode", key1: "user", key2:"invite_code" }),
      MyColumns.address({ title: "Address", key1: "address" }),
      MyColumns.common({ title: "Title", key1: "intro" }),      
      MyColumns.content({ title: "Content", key1: "content"}),
      MyColumns.enumTag({
        title: "Read",
        key1: "has_read",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      MyColumns.dateTime({}),
      // MyColumns.dateTime({ title: "Created At", key1: "created_at"}),
      
      // MyColumns.address({ title: "Address", key1: "address" }),
      // MyColumns.common({ title: "Full name", key1: "full_name" }),
      // MyColumns.common({ title: "Id No.", key1: "id_no" }),
      // MyColumns.common({ title: "Country", key1: "country" }),
      // MyColumns.common({ title: "City", key1: "city" }),
      // MyColumns.common({
      //   title: "Error Today",
      //   key1: "identity_error_count_today",
      // }),
      // MyColumns.dateTime({}),
      
    ] as ProColumns<any, "text">[],
  };

  const sendMessage = () => {
    modalRef.current?.showModal({
      title: "SendMessage",
      child: <SendPrivateMessage actions={actions} />,
    });
  }

  return (
    <>
      <PageContainer
        title="Private Messages"
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
