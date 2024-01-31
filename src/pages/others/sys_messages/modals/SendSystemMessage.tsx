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

export const SendSystemMessage = (props: any) => {
    const formRef = useRef<ProFormInstance<any>>();
    const item = useContext(MyModalDataContext);
    const [imageValid, setImageValid] = useState(true);
    

    useEffect(() => {
        formRef?.current?.setFieldsValue(item);
    }, [item]);

    return (
        <MyModalForm
            formRef={formRef}
            onFinish={(values: any) => {
                const url = formRef.current?.getFieldValue('url');
                if(url){
                    setImageValid(true);
                    props.actions?.store({ ...values, url });
                    return Promise.resolve();
                }else{
                    setImageValid(false);
                    return Promise.reject(false);
                }
                
            }}
        >
            <ProFormText
                label="Title"
                name="title"
                placeholder="Title"
                wrapperCol={{ span: 18 }}
                rules={[{ required: true, message: "Title!" }]}
            />
            <ProFormTextArea
                label="Content"
                name="content"
                placeholder="Content"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 0 }}
                rules={[{ required: true, message: "Content!" }]}
            />
            <Row>
                <Col span={6} style={{ textAlign: 'right', paddingRight: '10px' }}>
                    <span style={{ color:'#ff4d4f' }}>*</span>Image:
                </Col>
                <Col span={18}>
                    <MyUpload
                        onChangeFile={(e: any) => {
                            formRef?.current?.setFieldsValue({ url: e?.url });
                            if(e?.url)
                                setImageValid(true);
                            else
                                setImageValid(false);
                        }}
                    />
                    {
                        imageValid ? <></> : <span style={{ color:'#ff4d4f' }}>You have to upload Image</span>
                    }
                </Col>
            </Row>
        </MyModalForm>
    );
};
