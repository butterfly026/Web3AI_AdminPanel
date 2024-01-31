import {
  MyButtons,
  MyColumns,
  MyPagination,
  processYesOrNo,
  useListPage,
} from "@/common";
import { YesOrNoEnum } from "@/enums";
import { ProCard, ProFormSwitch } from "@ant-design/pro-components";
import { ProFormText, QueryFilter } from "@ant-design/pro-form";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns } from "@ant-design/pro-table";
import ProTable from "@ant-design/pro-table";
import { message } from "antd";
import { request, useLocation } from "umi";
import { Create } from "./modals/Create";
import { Identity } from "./modals/Identity";
import { Profile } from "./modals/Profile";
import { Registry } from "./modals/Registry";
import SetUpInfo from "./modals/SetUpInfo";
import { Staking } from "./modals/Staking";
import { Update } from "./modals/Update";
import Withdraw from "./modals/Withdraw";

export default () => {
  const location = useLocation();
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: "fake_users",
    otherApi: {
      to_user: (values: any) => {
        request("fake_users/to_user", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
      staking: (values: any) => {
        request("fake_users/staking", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
      withdraw: (values: any) => {
        request("fake_users/withdraw", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
      profile: (values: any) => {
        request("fake_users/profile", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
      identity: (values: any) => {
        request("fake_users/identity", {
          data: values,
        }).then(() => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
      user_setting: (values: any) => {
        request("fake_users/user_setting", {
          data: values,
        }).then((res) => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.reload();
        });
      },
    },
  });

  const tableProps = {
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.user({ title: "Real User", key1: "user" }),
      MyColumns.address({ title: "Address", key1: "address" }),
      MyColumns.common({ title: "Email" }),
      MyColumns.enumTag({
        title: "Registered",
        key1: "users_id",
        items: YesOrNoEnum,
        process: processYesOrNo,
      }),
      {
        title: "Staking",
        render: (_: any, item: any) => {
          return item.user?.staking?.[0]?.balance;
        },
      },
      {
        title: "Withdrawable",
        render: (_: any, item: any) => {
          return item.user?.withdraw?.[0]?.balance;
        },
      },
      MyColumns.address({ title: "Parent", key1: "parent_address" }),
      MyColumns.dateTime({}),
      {
        title: "Operate",
        key: "action",
        align: "right",
        fixed: "right",
        valueType: "option",
        render: (_: any, item: any) => [
          <MyButtons.EditButton
            key={"edit_" + item.id}
            title="Edit"
            onClick={() => {
              modalRef.current?.showModal({
                title: "Edit",
                defaultData: item,
                child: <Update actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"registry_" + item.id}
            title="Register"
            disabled={item.users_id > 0}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Register",
                defaultData: item,
                child: <Registry actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"profile_" + item.id}
            title="Profile"
            disabled={!item.user || item.user?.profile_verified_at}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Profile",
                defaultData: item,
                child: <Profile actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"identity_" + item.id}
            title="Identity"
            disabled={!item.user || item.user?.identity_verified_at}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Identity",
                defaultData: item,
                child: <Identity actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"staking_" + item.id}
            title="Staking"
            disabled={!item.users_id}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Staking",
                defaultData: item,
                child: <Staking actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"withdraw_" + item.id}
            title="Withdraw"
            disabled={!item.users_id}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Withdraw",
                defaultData: item,
                child: <Withdraw actions={actions} />,
              });
            }}
          />,
          <MyButtons.EditButton
            key={"setupinfo_" + item.id}
            title="Setting"
            disabled={!item.users_id}
            onClick={() => {
              modalRef.current?.showModal({
                title: "Setting",
                defaultData: item,
                child: <SetUpInfo actions={actions} />,
              });
            }}
          />,
          // <MyButtons.EditButton
          //   key={"withdraw_" + item.id}
          //   title="Withdraw"
          //   disabled={!item.users_id}
          //   onClick={() => {
          //     modalRef.current?.showModal({
          //       title: "Withdraw",
          //       defaultData: item,
          //       child: <Withdraw actions={actions} />,
          //     });
          //   }}
          // />,
        ],
      },
    ] as ProColumns<any, "text">[],
    toolBarRender: () => [
      // <MyButtons.ExportButton actions={actions} params={params?.s} />,
      <MyButtons.CreateButton
        title="Create No."
        onClick={() => {
          modalRef.current?.showModal({
            title: "Create No.",
            child: <Create actions={actions} />,
          });
        }}
      />,
    ],
  };

  return (
    <>
      <PageContainer
        title="Demo Member"
        footer={[<MyPagination key="page" {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name="nickname" label="Nick name" />
              <ProFormText name="address" label="Address" />
              {/*<ProFormText name='email' label='Email' />*/}
              <ProFormSwitch name="has_user" label="Has user" />
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
