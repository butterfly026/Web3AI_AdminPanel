import { MyButtons, MyColumns, MyPagination, useListPage } from "@/common";
import { MyEnumFormSelect } from "@/common/components/MyEnumFormSelect";
import { UsersIdentityStatusEnum } from "@/enums";
import { ProCard } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { history, useLocation } from "umi";
import { Update } from "./modals/Update";

export default () => {
  const location = useLocation();
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "users",
    defaultParams: { s: { identity_status: "Waiting" } },
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.user({ title: "User" }),
      MyColumns.address({ title: "Address", key1: "address" }),
      MyColumns.common({ title: "Full name", key1: "full_name" }),
      MyColumns.common({ title: "Id No.", key1: "id_no" }),
      MyColumns.common({ title: "Country", key1: "country" }),
      MyColumns.common({ title: "City", key1: "city" }),
      MyColumns.common({
        title: "Error Today",
        key1: "identity_error_count_today",
      }),
      MyColumns.dateTime({}),
      {
        title: "Operate",
        key: "action",
        align: "right",
        fixed: "right",
        valueType: "option",
        render: (_: any, item: any) => [
          <MyButtons.ShowButton
            key={"show_" + item.id}
            onClick={() => {
              // DetailPage.set();
              history.push(`/users/users/${item.id}/details`);
            }}
          />,
          <MyButtons.EditButton
            key={"examine_" + item.id}
            title="Edit"
            onClick={() => {
              modalRef.current?.showModal({
                title: "Edit",
                defaultData: item,
                child: <Update actions={actions} />,
              });
            }}
          />,
        ],
      },
    ] as ProColumns<any, "text">[],
  };

  return (
    <>
      <PageContainer
        title="User Management"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="nickname" label="Nick name" />
              {/*<ProFormText name="full_name" label="Full name" />*/}
              <ProFormText name="address" label="Address" />
              {/*<ProFormText name="parent_address" label="Parent1" />*/}
              {/*<MyEnumFormSelect*/}
              {/*  name="trailed"*/}
              {/*  label="Trailed"*/}
              {/*  items={YesOrNoEnum}*/}
              {/*/>*/}
              {/*<MyEnumFormSelect*/}
              {/*  name="email_verified"*/}
              {/*  label="Email Verified"*/}
              {/*  items={YesOrNoEnum}*/}
              {/*/>*/}
              <MyEnumFormSelect
                name="profile_status"
                label="Profile Status"
                items={UsersIdentityStatusEnum}
              />
              <MyEnumFormSelect
                name="identity_status"
                label="Identity Status"
                items={UsersIdentityStatusEnum}
              />
              {/* <MyEnumFormSelect
                name="status"
                label="Status"
                items={UsersStatusEnum}
              /> */}
            </QueryFilter>
            <ProTable
              {...table}
              {...tableProps}
              expandable={{ defaultExpandAllRows: true }}
            />
          </ProCard>
        }
      />
    </>
  );
};
