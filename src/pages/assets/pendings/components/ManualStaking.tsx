import { MyEnumFormRadioGroup, MyModalForm } from "@/common";
import { ETHSymbolEnum, Web3NetworkEnum } from "@/enums";
import {
  ProFormDigit,
  ProFormInstance,
  ProFormText,
} from "@ant-design/pro-components";
import { useRef } from "react";
import { request } from "umi";

type ManualStakingProps = {
  onClose: () => void;
};

const ManualStaking = ({ onClose }: ManualStakingProps) => {
  const formRef = useRef<ProFormInstance<any>>();

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(value: any) => {
        return request("assets/manual_staking", { data: value }).then(() => {
          formRef?.current?.resetFields();
          onClose();
        });
      }}
    >
      <ProFormText
        width={"xl"}
        name={"user_address"}
        label="User Address"
      ></ProFormText>

      <MyEnumFormRadioGroup
        width={"xl"}
        name="coin_symbol"
        label="Coin Symbol"
        items={ETHSymbolEnum}
      />

      <MyEnumFormRadioGroup
        width={"xl"}
        name="network"
        label="Network"
        items={Web3NetworkEnum}
      />
      <ProFormDigit width={"xl"} name={"amount"} label="Amount"></ProFormDigit>
      <ProFormText width={"xl"} name={"hash"} label="Hash"></ProFormText>
    </MyModalForm>
  );
};

export default ManualStaking;
