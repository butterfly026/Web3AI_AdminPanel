import {
    MyModalDataContext,
    MyModalForm,
} from "@/common";
import { ProFormInstance, ProFormText } from "@ant-design/pro-components";
import { useContext, useEffect, useRef } from "react";

export const SetAgent = (props: any) => {
    const formRef = useRef<ProFormInstance<any>>();
    const item = useContext(MyModalDataContext);

    useEffect(() => {
        formRef?.current?.setFieldsValue({
            ...item,
        });
    }, [item]);

    return (
        <MyModalForm
            formRef={formRef}
            onFinish={(values: any) => {
                props.actions?.setAgent({ ...values, id: item?.id });
                return Promise.resolve();
            }}
        >
            <ProFormText
                label="Username"
                name="username"
                placeholder="username"
                rules={[{ required: true, message: "username!" }]}
            />
            <ProFormText.Password
                label="Password"
                name="password"
                placeholder="password"
                rules={[{ required: true, message: "password!" }]}
            />
        </MyModalForm>
    );
};
