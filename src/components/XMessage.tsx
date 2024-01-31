import { message } from "antd";
export default {
  success: ({ key = "Ok" }: any) => {
    return message.success(key);
  },
};
