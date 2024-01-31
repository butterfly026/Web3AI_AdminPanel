import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";
import { PicRightOutlined } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { Button, message, Tag } from "antd";
import { request } from "umi";
import { Create } from "./modals/Create";
import { Permissions } from "./modals/Permissions";
import { Update } from "./modals/Update";

export default () => {
  const { modalRef, actions, pagination, search, table } = useListPage({
    baseUri: "sys_roles",
    otherApi: {
      setPermissions: (id: number, permissions_ids: number[]) => {
        request("sys_roles/set_permissions", {
          data: { id: id, permissions_ids: permissions_ids },
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
        });
      },
    },
  });

  const tableProps = {
    columns: [
      MyColumns.id,
      {
        title: "RoleName",
        dataIndex: "name",
        render: (_: any, record: any) => (
          <Tag color={record.color}>{record.name}</Tag>
        ),
      },
      {
        title: "SettingPermissions",
        render: (_: any, record: any) => [
          <Button
            key="setPermission"
            type="primary"
            size="small"
            ghost
            icon={<PicRightOutlined />}
            onClick={() => {
              modalRef.current?.showModal({
                title: "SettingPermissions",
                defaultData: record,
                child: <Permissions actions={actions} />,
              });
            }}
          >
            SettingPermissions
          </Button>,
        ],
      },
      MyColumns.dateTime({}),
      {
        title: "Operate",
        key: "action",
        align: "right",
        valueType: "option",
        render: (_: any, record: any) => [
          <MyButtons.EditButton
            key={"edit_" + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: "EditRole",
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
        title="CreateRole"
        onClick={() =>
          modalRef.current?.showModal({
            title: "CreateRole",
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="RoleManagement"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="name" label="RoleName" />
            </QueryFilter>
          </ProCard>
          <ProTable
            {...table}
            {...tableProps}
            expandable={{ defaultExpandAllRows: true }}
          />
        </>
      }
    />
  );
};
