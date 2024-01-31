import { message as msg } from "antd";
import type { RequestConfig } from "umi";
import { history } from "umi";
import { state, stateActions } from "../state/index";

const downloadFile = (disposition: string, data: any) => {
  disposition = disposition.replace("utf-8", "UTF-8");
  const blob = new Blob([data]);
  const start = "filename*=UTF-8''";
  let fileName = "";
  if (disposition.includes(start)) {
    fileName = disposition.substr(disposition.indexOf(start) + start.length);
    fileName = decodeURI(fileName);
  }
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink: any = document.createElement("a");
    elink.download = fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    // navigator.msSaveBlob(blob, fileName);
  }
};

export const requestConfig: RequestConfig = {
  timeout: 30000,
  method: "post",
  baseURL: process.env.BASE_URL,
  errorConfig: {
    errorHandler(res: any) {
      stateActions.subLoading();
      if (res) {
        msg.error(res.message);
        switch (res.code) {
          case 10000:
            if (history.location.pathname !== "/login") history.push("/login");
            break;
        }
      }
    },
    errorThrower(err) {
      stateActions.subLoading();
      console.log("errorThrower", err);
    },
  },
  requestInterceptors: [
    [
      (url: string, options: any) => {
        stateActions.addLoading();
        return {
          url: url,
          options: {
            ...options,
            headers: {
              authorization: "Bearer " + state.storage.access_token,
            },
          },
        };
      },
    ],
  ],
  responseInterceptors: [
    (response: any) => {
      const { headers } = response;
      if (headers["content-disposition"]) {
        downloadFile(headers["content-disposition"], response.data);
        stateActions.subLoading();
        return false;
      }
      const { data = {} as any } = response;
      if (data.code !== 0 && data.type !== "application/vnd.ms-excel") {
        return Promise.reject(response.data);
      } else {
        stateActions.subLoading();
      }
      return response;
    },
  ],
};
