import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
  getImgUrl,
} from "@/common";
import XSelect from "@/components/XSelect";
import { request } from "umi";
import { UsersIdentityApproveStatusEnum, UsersIdentityStatusEnum, UsersStatusEnum, TwoFAEnum } from "@/enums";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { Col, Row, Space, Image, Typography, Input, message, Button } from "antd";
import { useContext, useEffect, useRef, useState } from "react";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);
  const [isEnable2FA, setIsEnable2FA] = useState(item?.is_verifiedkey);

  useEffect(() => {
  }, []);
  
  const handleOptionChange = () => {
    setIsEnable2FA(!isEnable2FA);
  };

  useEffect(() => {
    formRef?.current?.setFieldsValue({
      ...item,
      ...{ parent_address: item?.parent_1?.address },
    });
  }, [item]);

  const onFinish = (values: any) => {
    if(!isEnable2FA) {
      request('users/disable_2fa', {data: {address: item?.address}})
      .then((res) => {
        props.actions?.update({ ...values, id: item?.id, is_verifiedkey: isEnable2FA ? 1 : 0 });
            return Promise.resolve();
        });
    }
    else {
      props.actions?.update({ ...values, id: item?.id, is_verifiedkey: isEnable2FA ? 1 : 0 });
      return Promise.resolve();
    }
  }

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={onFinish}
    >
      <ProFormText
        label="Address"
        name="address"
        placeholder="address"
        rules={[{ required: true, message: "address!" }]}
      />
      <MyEnumFormRadioGroup
        label="Profile Status"
        name="profile_status"
        items={UsersIdentityStatusEnum}
      />
      <XSelect.MessageSelect
        name="profile_error_message"
        label="Profile Error Message"
        rules={[
          ({ getFieldValue }: any) => ({
            validator(_: any, value: any) {
              if (!value && getFieldValue("profile_status") === "Failed") {
                return Promise.reject(
                  new Error("Select a reason for rejection!")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
      <MyEnumFormRadioGroup
        label="Identity Status"
        name="identity_status"
        items={UsersIdentityStatusEnum}
      />
      <XSelect.MessageSelect
        name="identity_error_message"
        label="Identity Error Message"
        rules={[
          ({ getFieldValue }: any) => ({
            validator(_: any, value: any) {
              if (!value && getFieldValue("identity_status") === "Failed") {
                return Promise.reject(
                  new Error("Select a reason for rejection!")
                );
              }
              return Promise.resolve();
            },
          }),
        ]}
      />
       <Row>
        <Col span={6}>Identify Photo Approve: </Col>
        <Col span={18}>
          <Row style={{ marginBottom: 12, marginLeft: 12, display: "flex", alignItems: "center", justifyContent: 'space-between' }} >
            <Col span={12}>
              <Image src={getImgUrl(item?.self_photo_img)} width={214} height={116} preview={true} />
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>SelfPhoto_img</Typography.Title>
              <MyEnumFormRadioGroup
                label=""
                name="self_photo_img_status"
                items={UsersIdentityApproveStatusEnum}
                />
            </Col>
          </Row>
          <Row style={{ marginBottom: 12, marginLeft: 12, display: "flex", alignItems: "center", justifyContent: 'space-between' }} >
            <Col span={12}>
              <Image src={getImgUrl(item?.id_front_img)} width={214} height={116} preview={true} />
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>FrontID_img</Typography.Title>
              <MyEnumFormRadioGroup
                label=""
                name="id_front_img_status"
                items={UsersIdentityApproveStatusEnum}
                />
            </Col>
          </Row>
          <Row style={{ marginBottom: 12, marginLeft: 12, display: "flex", alignItems: "center", justifyContent: 'space-between' }} >
            <Col span={12}>
              <Image src={getImgUrl(item?.id_reverse_img)} width={214} height={116} preview={true} />
            </Col>
            <Col span={12}>
              <Typography.Title level={5}>BackID_img</Typography.Title>
              <MyEnumFormRadioGroup
                label=""
                name="id_reverse_img_status"
                items={UsersIdentityApproveStatusEnum}
                />
            </Col>
          </Row>
        </Col>
      </Row>
      <ProFormText
        label="Parent"
        name="parent_address"
        placeholder="parent_address"
      />
      <MyEnumFormRadioGroup
        label="Status"
        name="status"
        items={UsersStatusEnum}
      />
      
      <Row style={{marginBottom: '20px', alignItems: 'center', display: 'flex'}}>
        <Col span={6} style={{paddingRight: '8px', textAlign: 'right'}}>2FA: </Col>
        <Col span={18}>
          {
            isEnable2FA ?
              <>
                The user already activated 2FA. Do you want to disable 2FA?
                <Button
                  onClick={handleOptionChange}
                > 
                  Yes
                </Button>
              </>
            :
              <>
                  The user disabled 2FA.
              </>
          }
        </Col>
      </Row>
    </MyModalForm>
  );
};
