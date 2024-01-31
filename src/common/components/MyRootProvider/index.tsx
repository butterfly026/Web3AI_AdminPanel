import { ConfigProvider } from "antd";
import en_US from "antd/locale/en_US";
import "dayjs/locale/zh-cn";
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import React, { useRef } from "react";
import { Outlet } from "umi";
import { MyLoading } from "../MyLoading";
import { MyModal, MyModalRefType } from "../MyModal";

export const MyModalRefContext = React.createContext({});

export const MyRootProvider = () => {
  const ref = useRef<MyModalRefType>();
  dayjs.extend(relativeTime)
  return (
    <ConfigProvider locale={en_US}>
      <MyLoading />
      <MyModalRefContext.Provider value={ref}>
        <MyModal ref={ref} />
        <Outlet />
      </MyModalRefContext.Provider>
    </ConfigProvider>
  );
};
