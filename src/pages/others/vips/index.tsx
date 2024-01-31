import { MyButtons, MyColumns, MyPagination, useListPage } from '@/common';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from '@ant-design/pro-components';
import { Space } from 'antd';
import { Create } from './modals/Create';
import { Update } from './modals/Update';

export default () => {
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: 'vips',
  });
  const tableProps = {
    scroll: { x: 'max-content', scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      {
        title: 'VIP',
        dataIndex: 'name',
        sorter: true,
      },
      {
        title: '操作',
        key: 'action',
        align: 'right',
        valueType: 'option',
        render: (_: any, record: any) => [
          <MyButtons.EditButton
            key={'edit_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: 'EditVIP',
                defaultData: record,
                child: <Update actions={actions} />,
              });
            }}
          />,
          // <MyButtons.DeleteButton
          //   key={"delete_" + record.id}
          //   onConfirm={() => actions.delete({ id: record.id })}
          // />,
        ],
      },
    ] as ProColumns<any, 'text'>[],
    toolBarRender: () => [
      <MyButtons.CreateButton
        key='create'
        title='CreateVIP'
        onClick={() =>
          modalRef.current?.showModal({
            title: 'CreateVIP',
            child: <Create actions={actions} />,
          })
        }
      />,
    ],
  };

  return (
    <>
      <PageContainer
        title='Vip'
        footer={[<MyPagination key='page' {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name='name' label='Name' />
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
