import { stateActions } from "@/common";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProFormText } from "@ant-design/pro-components";
import { useModel } from "umi";

export const MyLogin = (props: any) => {
  const { setInitialState } = useModel("@@initialState");

  const onFinish = async (values: any) => {
    stateActions.login(setInitialState, values);
  };

  return (
    <LoginForm {...props} onFinish={onFinish}>
      <ProFormText
        name="username"
        fieldProps={{
          size: "large",
          prefix: <UserOutlined className={"prefixIcon"} />,
        }}
        placeholder="Please input username"
        rules={[
          {
            required: true,
            message: "Please input username!",
          },
        ]}
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: "large",
          prefix: <LockOutlined className={"prefixIcon"} />,
        }}
        placeholder="Please input password"
        rules={[
          {
            required: true,
            message: "Please input password!",
          },
        ]}
      />
    </LoginForm>
  );
};
