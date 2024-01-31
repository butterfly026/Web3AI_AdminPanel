import {
    MyEnumFormRadioGroup,
    MyModalDataContext,
    MyModalForm,
    getImgUrl,
} from "@/common";
import MyUpload from "@/common/components/MyUpload";
import XSelect from "@/components/XSelect";
import { UsersIdentityApproveStatusEnum, UsersIdentityStatusEnum } from "@/enums";
import { ProFormInstance, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Col, Row, Typography, Image } from "antd";
import { useContext, useEffect, useRef, useState } from "react";

export const SendPrivateMessage = (props: any) => {
    const formRef = useRef<ProFormInstance<any>>();
    const item = useContext(MyModalDataContext);
    

    useEffect(() => {
        formRef?.current?.setFieldsValue(item);
    }, [item]);

    return (
        <MyModalForm
            formRef={formRef}
            onFinish={(values: any) => {
                props.actions?.addprivatemsg({ ...values});
                return Promise.resolve();
            }}
        >
            <ProFormText
                label="Address"
                name="address"
                placeholder="User Wallet Address"
                wrapperCol={{ span: 18 }}
                rules={[{ required: true, message: "Enter User Wallet Address!" }]}
            />
            <ProFormText
                label="Title"
                name="title"
                placeholder="Title"
                wrapperCol={{ span: 18 }}
                rules={[{ required: true, message: "Enter Title!" }]}
            />
            <ProFormTextArea
                label="Content"
                name="content"
                placeholder="Content"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 0 }}
                rules={[{ required: true, message: "Enter Content!" }]}
            />
        </MyModalForm>
    );
};
