import {
  MyButtons,
  MyColumns,
  MyEnumFormSelect,
  MyPagination,
  useListPage,
} from '@/common';
import XSelect from '@/components/XSelect';
import { FundsProductTypeEnum, FundsRiskTypeEnum } from '@/enums';
import {
  ProCard,
  ProFormSelect,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Tag, Space, Avatar, Typography } from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { Update } from './modals/update';

export default () => {
  const [currentDuration, setCurrentDuration] = useState({});
  const { modalRef, actions, params, pagination, search, table } = useListPage({
    baseUri: 'funds',
  });

  const computeRangeColumns = (data) => {
    console.log(data);
    return [
      MyColumns.id,
      MyColumns.coinIcon({ title: 'Coin', key1: 'main_coin' }),
      MyColumns.eTag({
        title: 'Product Type',
        items: FundsProductTypeEnum,
        key1: 'product_type',
      }),
      MyColumns.eTag({
        title: 'Risk Type',
        key1: 'risk_type',
        items: FundsRiskTypeEnum,
      }),
      MyColumns.percentRange({
        title: 'apr',
        key1: 'apr_start',
        key2: 'apr_end',
        rangeKey: 'profits',
        rangeIndex: data,
      }),
      MyColumns.durationSelect({
        title: 'Duration',
        onChange: (e, value) => {
          console.log(e, value, data);
          setCurrentDuration({
            ...data,
            [value]: e,
          });
        },
      }),
      {
        title: 'Operate',
        render: (_: string, record: any) => (
          <>
            <MyButtons.EditButton
              key={'edit_' + record.id}
              onClick={() => {
                modalRef.current?.showModal({
                  title: 'Edit Funds',
                  defaultData: record,
                  child: <Update actions={actions} />,
                });
              }}
            ></MyButtons.EditButton>
          </>
        ),
      },
    ];
  };

  //   TODO LEFT a BUG, about data not refresh
  const rangeColumns = useMemo(
    () => computeRangeColumns(currentDuration),
    [currentDuration]
  );

  const tableProps = {
    scroll: { x: 'max-content', scrollToFirstRowOnChange: true },
    columns: rangeColumns as ProColumns<any, 'text'>[],
    toolBarRender: () => [],
  };

  return (
    <>
      <PageContainer
        title='Funds'
        footer={[<MyPagination key='page' {...pagination} />]}
        content={
          <ProCard>
            <QueryFilter {...search}>
              <ProFormText name='name' label='Name' />
              <MyEnumFormSelect
                name='product_type'
                label={'Product Type'}
                items={FundsProductTypeEnum}
              />
              <MyEnumFormSelect
                name='risk_type'
                label={'Risk Type'}
                items={FundsRiskTypeEnum}
              />
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
