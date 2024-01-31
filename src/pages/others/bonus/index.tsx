import {MyButtons, MyColumns, MyPagination, useListPage} from "@/common";
import {MyEnumFormSelect} from "@/common/components/MyEnumFormSelect";

import {
    AirdropStatusEnum,
    UserBonusesStatusEnum,
    UserBonusesTypeEnum,
} from "@/enums";
import {
    PageContainer,
    ProCard,
    ProColumns,
    ProFormText,
    ProTable,
    QueryFilter,
} from "@ant-design/pro-components";

export default () => {
    const {modalRef, actions, params, pagination, search, table} = useListPage({
        baseUri: "bonus",
    });

    const tableProps = {
        scroll: {x: "max-content", scrollToFirstRowOnChange: true},
        columns: [
            MyColumns.id,
            MyColumns.user({title: "User", key1: 'from'}),
            MyColumns.address({title: 'From Address', key1: 'from', key2: 'address'}),
            MyColumns.user({title: 'Ref User', key1: 'to'}),
            MyColumns.address({title: 'Ref Address', key1: 'to', key2: 'address'}),
            MyColumns.eTag({
                title: "Type",
                key1: 'type',
                items: UserBonusesTypeEnum,
            }),
            MyColumns.coin({title: 'Friend Bonus', key1: 'friend_bonus'}),
            MyColumns.percent({title: 'Bonus Rate', key1: 'bonus_rate'}),
            MyColumns.coin({title: 'Bonus', key1: 'bonus'}),
            MyColumns.dateTime({title: 'Created At', key1: 'created_at'}),
            MyColumns.eTag({
                key1: 'status',
                title: "Status",
                items: UserBonusesStatusEnum,
            }),
            // {
            //   title: "操作",
            //   key: "action",
            //   align: "right",
            //   valueType: "option",
            //   render: (_: any, record: any) => [
            //     <MyButton.ShowButton
            //       key={"show_" + record.id}
            //       onClick={() => {
            //         modalRef.current?.showModal({
            //           title: "Show",
            //           defaultData: record,
            //           child: <Show actions={actions} />,
            //         });
            //       }}
            //     />,
            //   ],
            // },
        ] as ProColumns<any, "text">[],
        toolBarRender: () => [],
    };

    return (
        <>
            <PageContainer
                title="Reward"
                footer={[<MyPagination key="page" {...pagination} />]}
                content={
                    <ProCard>
                        <QueryFilter {...search}>
                            <ProFormText name="from_address" label="From"/>
                            <ProFormText name="to_address" label="To"/>
                            <MyEnumFormSelect
                                name="type"
                                label="Type"
                                items={UserBonusesTypeEnum}
                            />
                            <MyEnumFormSelect
                                name="status"
                                label="Status"
                                items={UserBonusesStatusEnum}
                            />
                        </QueryFilter>
                        <ProTable
                            {...table}
                            {...tableProps}
                            expandable={{defaultExpandAllRows: true}}
                        />
                    </ProCard>
                }
            />
        </>
    );
};
