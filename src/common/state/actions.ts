import { message } from "antd";
import { history, request } from "umi";
import { state } from ".";
import { loopMenu } from "../utils/menuHelper";

export const stateActions = {
  addLoading: () => {
    state.session.count++;
  },
  subLoading: () => {
    state.session.count--;
  },
  me: async () => {
    const res = await request("auth/me", {});
    if (res.code === 0) {
      state.session.user = res.data?.user;
      state.session.permissions = res.data?.permissions;
      return {
        name: res.data.user.username,
      };
    } else {
      return { name: "未登录" };
    }
  },
  login: (setInitialState: any, values: any) => {
    request("auth/login", { data: values }).then((res: any) => {
      setInitialState({
        name: res.data.user.username,
      });
      state.session.user = res.data?.user;
      state.session.permissions = res.data?.permissions;
      state.storage.access_token = res.data?.token.access_token;
      message.success("登录成功！");
      history.push("/welcome");
    });
  },
  menu: () => {
    const menu = loopMenu(state.session.permissions?.children, true);    
    console.log("menu", state.session.permissions);
    return menu;
  },
};
