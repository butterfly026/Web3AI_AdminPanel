import {
  MyEnumFormRadioGroup,
  MyModalDataContext,
  MyModalForm,
  getImgUrl,
} from "@/common";
import XSelect from "@/components/XSelect";
import { UsersIdentityApproveStatusEnum, UsersIdentityStatusEnum } from "@/enums";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { Col, Row, Typography, Image } from "antd";
import { useContext, useEffect, useRef } from "react";

export const Update = (props: any) => {
  const formRef = useRef<ProFormInstance<any>>();
  const item = useContext(MyModalDataContext);

  useEffect(() => {
    console.log("update item", item);
    formRef?.current?.setFieldsValue(item);
  }, [item]);

  return (
    <MyModalForm
      formRef={formRef}
      onFinish={(values: any) => {
        props.actions?.update({ ...values, id: item?.id });
        return Promise.resolve();
      }}
    >
      <ProFormText
        label="Address"
        name="address"
        placeholder="Address"
        readonly
        rules={[{ required: true, message: "Address!" }]}
      />
      <MyEnumFormRadioGroup
        label="IdentityStatus"
        name="identity_status"
        items={UsersIdentityStatusEnum}
      />
      <XSelect.MessageSelect
        name="identity_error_message"
        label="IdentityErrorMessage"
        rules={[
          ({ getFieldValue }: any) => ({
            validator(_: any, value: any) {
              if (!value && getFieldValue("identity_status") === "Failed") {
                return Promise.reject(
                  new Error("Please select a reason for rejection!")
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
    </MyModalForm>
  );
};
