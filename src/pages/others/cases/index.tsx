import { MyColumns, MyPagination, processYesOrNo, useListPage } from '@/common';
import { MyEnumFormSelect } from '@/common/components/MyEnumFormSelect';
import { CasesStatusEnum, YesOrNoEnum } from '@/enums';
import { UserOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProColumns,
  ProFormText,
  ProTable,
  QueryFilter,
} from '@ant-design/pro-components';
import { Avatar, Button, Space, Typography, Tag } from 'antd';
import { Answer } from './_modals/Answer';
import { Circuit } from './_modals/CircuitChanger';
import Show from './_modals/Show';
import XTag from '@/components/XTag';

export default () => {
  const { modalRef, actions, pagination, search, table, styles } = useListPage({
    baseUri: 'cases',
  });

  const tableProps = {
    scroll: { x: 'max-content', scrollToFirstRowOnChange: true },
    columns: [
      MyColumns.id,
      MyColumns.user({ title: 'User', key1: 'user' }),
      MyColumns.address({
        title: 'User Address',
        key1: 'user',
        key2: 'address',
      }),
      MyColumns.common({ title: 'Subject', key1: 'subject' }),
      MyColumns.common({ title: 'Content', key1: 'content' }),
      MyColumns.enumTag({
        title: 'User Has Read',
        items: YesOrNoEnum,
        key1: 'frontend_is_new',
        process: (v) => processYesOrNo(!v),
      }),
      MyColumns.enumTag({
        title: 'Admin Has Read',
        items: YesOrNoEnum,
        key1: 'backend_is_new',
        process: (v) => processYesOrNo(!v),
      }),
      MyColumns.common({
        title: 'Updated At',
        key1: 'updated_at',
        sorter: true,
      }),
      MyColumns.eTag({
        title: 'Status',
        items: CasesStatusEnum,
      }),
      {
        title: 'Operate',
        key: 'action',
        align: 'right',
        valueType: 'option',
        render: (_: any, record: any) => [
          <Button
            key={'answer_' + record.id}
            onClick={() => {
              modalRef.current?.showModal({
                title: 'Answer',
                defaultData: record,
                child: <Answer actions={actions} record={record} />,
              });
            }}
          >
            Answer
          </Button>,
          <Button
            key={'edit_' + record.id}
            type='primary'
            onClick={() => {
              modalRef.current?.showModal({
                title: 'Show',
                defaultData: record,
                width: 1200,
                child: (
                  <Show
                    actions={actions}
                    onClose={modalRef.current?.hideModal}
                  />
                ),
              });
            }}
          >
            Details
          </Button>,
          <Button
            key={'Circuit_' + record.id}
            type='primary'
            onClick={() => {
              modalRef.current?.showModal({
                title: 'Switch',
                defaultData: record,
                child: <Circuit actions={actions} />,
              });
            }}
          >
            Switch
          </Button>,
        ],
      },
    ] as ProColumns<any, 'text'>[],
  };

  return (
    <>
      <PageContainer
        title='Cases'
        footer={[<MyPagination key='page' {...pagination} />]}
      />
      <ProCard>
        <QueryFilter {...search}>
          <ProFormText name='users_address' label='User Address' />
          <MyEnumFormSelect
            name='backend_is_new'
            label='Admin Has Read'
            items={YesOrNoEnum}
          />
          <MyEnumFormSelect
            name='status'
            label='Status'
            items={CasesStatusEnum}
          />
        </QueryFilter>
        <ProTable {...table} {...tableProps} />
      </ProCard>
    </>
  );
};
