import { MyButtons, useListPage } from "@/common";
import XTag from "@/components/XTag";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { message } from "antd";
import { request } from "umi";
import { Create } from "./modals/Create";
import { Update } from "./modals/Update";

export default () => {
  const { modalRef, actions, table, resData } = useListPage({
    baseUri: "sys_permissions",
    otherApi: {
      move: (id: number, type: string) => {
        request("sys_permissions/move", {
          data: { id: id, type: type },
        }).then(() => {
          message.success("Success");
          actions.list();
        });
      },
    },
  });

  const tableProps = {
    columns: [
      {
        title: "Name",
        dataIndex: "id",
        render: (_: any, record: any) => (
          <>
            {record.id}_{record.title}
          </>
        ),
      },
      {
        title: "Mark",
        dataIndex: "name",
      },
      {
        title: "Path",
        dataIndex: "url",
      },
      {
        title: "Type",
        render: (_: any, record: any) => (
          <XTag.SysPermissionsType value={record.type} />
        ),
      },
      {
        title: "Authorization mark",
        dataIndex: "permission",
      },
      /*{
        title: '菜单显示',
        render: (_: any, record: any) => <XTag.Boolean value={record.show_in_menu} />,
      },*/
      {
        title: "SystemApi",
        dataIndex: "api_json",
      },
      {
        title: "Rank",
        render: (_: any, record: any) => [
          <MyButtons.MoveButton
            key="up"
            direction="up"
            disabled={!record.parent_id}
            onClick={() => actions.move(record.id, "up")}
          />,
          <MyButtons.MoveButton
            key="down"
            direction="down"
            disabled={!record.parent_id}
            onClick={() => actions.move(record.id, "down")}
          />,
        ],
      },
      {
        title: "Operate",
        key: "action",
        valueType: "option",
        align: "right",
        render: (_: any, record: any) => [
          <MyButtons.EditButton
            key={"edit_" + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Edit Menu",
                defaultData: record,
                child: <Update actions={actions} />,
              });
            }}
          />,
          <MyButtons.DeleteButton
            key={"delete_" + record.id}
            onConfirm={() => actions.delete({ id: record.id })}
          />,
        ],
      },
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [
      <MyButtons.CreateButton
        key="create"
        title="Create Menu"
        onClick={() =>
          modalRef.current?.showModal({
            title: "Create Menu",
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="Menu Setting"
      content={
        <>
          {!resData ? null : (
            <ProTable
              {...table}
              {...tableProps}
              expandable={{ defaultExpandAllRows: true }}
            />
          )}
        </>
      }
    />
  );
};
