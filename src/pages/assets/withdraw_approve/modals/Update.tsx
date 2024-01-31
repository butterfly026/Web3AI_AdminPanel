import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
} from "@/common";
import { AssetsPendingWithdrawalTypeEnum, YesOrNoEnum } from "@/enums";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { message } from "antd";
import { reject } from "lodash-es";
import { useContext, useEffect, useRef, useState } from "react";
import { request } from "umi";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);
  const [keyInfo, setKeyInfo] = useState({
    approve: undefined,
    pending_withdrawal_type: "",
  });

  useEffect(() => {
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  const onSave = (data: any) => {
    request("assets/confirm_withdraw", { data: data }).then((res: any) => {
      message.success("保存成功！");
      props?.modalRef.current?.hideModal();
      props?.actions?.list();
    });
    /*if(keyInfo?.approve === 0) {
      request("users/send_message", {data: {users_id: item?.id, type: "WithdrawalFailed", contect: data?.rejectReason}}).then( () =>{
        return;
      });*/
  };

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        onSave({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <MyEnumFormRadioGroup
        label="Review"
        name="approve"
        items={YesOrNoEnum}
        fieldProps={{
          onChange: (e: any) => {
            setKeyInfo({ ...keyInfo, ...{ approve: e?.target.value } });
            console.log(e?.target.value, "eeeee");
          },
        }}
      />
      {keyInfo?.approve === 1 ? (
        <MyEnumFormRadioGroup
          label="Withdrawal Type"
          name="pending_withdrawal_type"
          items={AssetsPendingWithdrawalTypeEnum}
          fieldProps={{
            onChange: (e: any) => {
              setKeyInfo({
                ...keyInfo,
                ...{ pending_withdrawal_type: e?.target.value },
              });
              console.log(e?.target.value, "eeeee");
            },
          }}
        />
      ) : (
        <ProFormText
          name="rejectReason"
          placeholder="Reject Reason"
          rules={[
            {
              required: true,
              message: "Please input username!",
            },
          ]}
        />
      )}
      {keyInfo?.pending_withdrawal_type == "Manual" ? (
        <ProFormText name="hash" label="Hash" />
      ) : (
        ""
      )}
    </MyModalForm>
  );
};
