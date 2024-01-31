import React from "react";
import {ConfigProvider} from "antd";
import enUS  from "antd/locale/en_US";
import Logo from "@/assets/favicon-512.png";
import { history, RuntimeConfig } from "umi";
import { requestConfig, state, stateActions } from "./common";
export async function getInitialState() {
  return await stateActions.me();
}
import "./global.less"
export function rootContainer(container: any) {
  return React.createElement(ConfigProvider, {locale: enUS}, container);
}

export const layout: RuntimeConfig["layout"] = () => {
  return {
    logo: Logo,
    title: "Ai Trade System",
    layout: "top",
    menu: {
      params: state.session.permissions,
      request: async () => stateActions.menu(),
    },
    logout: () => {
      localStorage.clear();
      history.push("/login");
    },
  };
};

export const request = requestConfig;
