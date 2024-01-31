import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from "@ant-design/pro-components";
import { Tag } from "antd";
import { Create } from "./modals/Create";
import { Update } from "./modals/Update";

export default () => {
  const { modalRef, actions, pagination, search, table } = useListPage({
    baseUri: "admins",
  });

  const tableProps = {
    columns: [
      MyColumns.id,
      {
        title: "UserName",
        dataIndex: "username",
        sorter: true,
      },
      {
        title: "Role",
        render: (_: any, record: any) => {
          return record.roles.map((item: any) => (
            <Tag key={item.id} color={item.color}>
              {item.name}
            </Tag>
          ));
        },
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
                title: "EditAdmin",
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
        title="CreateAdmin"
        onClick={() =>
          modalRef.current?.showModal({
            title: "CreateAdmin",
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <PageContainer
      title="Administrator"
      footer={[<MyPagination key="page" {...pagination} />]}
      content={
        <>
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="username" label="User" />
            </QueryFilter>
          </ProCard>
          <ProTable {...table} {...tableProps} />
        </>
      }
    />
  );
};
