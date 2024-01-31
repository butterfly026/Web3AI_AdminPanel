import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
} from '@/common';
import {
  CoinSymbolEnum,
  FundsProductTypeEnum,
  FundsRiskTypeEnum,
  UsersIdentityStatusEnum,
  UsersStatusEnum,
} from '@/enums';
import { ProFormInstance, ProFormText } from '@ant-design/pro-components';
import { useContext, useEffect, useRef } from 'react';
import XSelect from '@/components/XSelect';

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    console.log('Update Data', props, item);
    formRef?.current?.setFieldsValue({
      ...item,
      ...{ parent_address: item?.parent_1?.address },
    });
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <MyEnumFormRadioGroup
        label='Product Type'
        name='product_type'
        items={FundsProductTypeEnum}
      />
      <MyEnumFormRadioGroup
        label='Risk Type'
        name='risk_type'
        items={FundsRiskTypeEnum}
      />
      <MyEnumFormRadioGroup
        label='Main Coin'
        name='main_coin'
        items={FundsRiskTypeEnum}
      />
      <MyEnumFormRadioGroup
        label='Sub Coin'
        name='sub_coin'
        items={FundsRiskTypeEnum}
      />
      <XSelect.MessageSelect
        name='identity_error_message'
        label='Identity Error Message'
        rules={[
          ({ getFieldValue }: any) => ({
            validator(_: any, value: any) {
              if (!value && getFieldValue('identity_status') === 'Failed') {
                return Promise.reject(
                  new Error('Select a reason for rejection!')
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
      <ProFormText
        label='Parent'
        name='parent_address'
        placeholder='parent_address'
      />
    </MyModalForm>
  );
};
