import type {
  ProFormInstance,
  ProTableProps,
} from "@ant-design/pro-components";
import { SpaceProps, message } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { request, useSearchParams } from "umi";
import { MyModalRefContext } from "../components/MyRootProvider";

import {
  Actions,
  MyModalRefType,
  ParamsType,
  ResponseDataType,
} from "../typings";
import {
  fromSearchParamsToParams,
  getDataFromParams,
  getUrl,
} from "../utils/paramsHelper";

type DefaultActionType =
  | "list"
  | "store"
  | "update"
  | "softDelete"
  | "restore"
  | "delete"
  | "download"
  | string;

export type useListPageType = {
  /**
   * 默认的请求参数
   */
  defaultParams?: Record<string, any> | undefined;
  /**
   * 请求的地址前面的部分，相当于后端的controllerName
   */
  baseUri: string;
  /**
   * 请求的地址后面的部分，相当于后端的actionName
   */
  uris?: Partial<Record<DefaultActionType, string>>;
  /**
   * 其他本页面要用到的api
   */
  otherApi?: Record<string, (...args: any) => void>;
};

export const useListPage = ({
  defaultParams,
  baseUri,
  uris,
  otherApi,
}: any) => {
  // 查询参数、浏览器参数
  const [searchParams, setSearchParams] = useSearchParams();
  const [params, setParams] = useState<ParamsType>(() => {
    let t = fromSearchParamsToParams(searchParams.get("q"), defaultParams);
    return t;
  });

  // 请求返回的数据
  const [resData, setResData] = useState<ResponseDataType>();

  // 全局弹窗组件
  const modalRef = useContext(MyModalRefContext) as React.MutableRefObject<
    MyModalRefType | undefined
  >;

  // 标准接口
  const actions: Actions = {
    list: () => {
      request(
        getUrl(baseUri, "list", uris?.list),
        getDataFromParams(params)
      ).then((res: any) => {
        modalRef.current?.hideModal();
        setResData(res);
      });
    },
    reload: () => {
      actions.list();
    },
    store: (data) => {
      request(getUrl(baseUri, "store", uris?.store), { data: data }).then(
        () => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.list();
        }
      );
    },
    update: (data) => {
      request(getUrl(baseUri, "update", uris?.update), { data: data }).then(
        () => {
          message.success("Success");
          modalRef.current?.hideModal();
          actions.list();
        }
      );
    },
    batch_store: (data, type) => {
      request(getUrl(baseUri, "batch_store", uris?.update), {
        data: data,
        responseType: type,
      }).then(() => {
        message.success("Success");
        modalRef.current?.hideModal();
        actions.list();
      });
    },
    batch_download: (data) => {
      request(getUrl(baseUri, "download", uris?.update), {
        data: data,
        responseType: "blob",
      }).then(() => {
        message.success("Success");
        actions.list();
      });
    },
    remove: (data) => {
      request(getUrl(baseUri, "remove", uris?.update), { data: data }).then(
        () => {
          message.success("Success");
          actions.list();
        }
      );
    },
    softDelete: (data: any) => {
      if (!data.deleted_at)
        request(getUrl(baseUri, "soft_delete", uris?.softDelete), {
          data: { id: data.id },
        }).then(() => {
          message.success("Soft Delete Success");
          actions.list();
        });
      else
        request(getUrl(baseUri, "Restore", uris?.restore), {
          data: { id: data.id },
        }).then(() => {
          message.success("Restore Success!");
          actions.list();
        });
    },
    delete: (data) => {
      request(getUrl(baseUri, "delete", uris?.delete), {
        data: { id: data.id },
      }).then(() => {
        message.success("Delete Success! ");
        actions.list();
      });
    },
    download: (data) => {
      request(getUrl(baseUri, "download", uris?.download), {
        data: data,
        responseType: "blob",
      }).then(() => {
        message.success("Export success!");
      });
    },
    ...otherApi,
  };

  const pagination = {
    meta: resData?.meta,
    onChange: (page: number, pageSize: number) => {
      if (params?.s) {
        let t: any = {
          ...params,
          p: {
            page: page,
            perPage: pageSize,
          },
        };
        setParams(t);
      } else {
        let t: any = {
          ...params?.t,
          p: {
            page: page,
            perPage: pageSize,
          },
        };
        setParams(t);
      }
    },
  };

  const statistic = {
    items: resData?.additions?.statistics,
  };

  const search = {
    span: 6,
    defaultCollapsed: false,
    formRef: useRef<ProFormInstance>(),
    onFinish: (values: any) => {
      setParams({
        ...params,
        s: values,
      });
      return Promise.resolve();
    },
    onReset: () => {
      setParams({
        ...params,
        s: {},
        p: { page: 1, perPage: params?.p?.perPage || 20 },
      });
    },
  };

  const table: ProTableProps<Record<string, any>, any, "text"> = {
    rowKey: "id",
    pagination: false,
    search: false,
    scroll: { x: "max-content", scrollToFirstRowOnChange: true },
    // defaultSize: 'small',
    dataSource: resData?.data,
    options: {
      reload: () => actions.list(),
    },
    onChange: (_1: any, _2: any, sorter: any) => {
      let val = {
        ...params,
        t:
          sorter.order !== undefined
            ? { orderBy: [sorter.field, sorter.order] }
            : {},
      };
      setParams(val);
    },
  };

  const styles = {
    proCard: {
      bodyStyle: { padding: 0 },
    },
    space: {
      style: { padding: "20px" },
      size: "middle",
      direction: "vertical",
    } as SpaceProps,
  };

  /**
   * 当参数变化的时候，改变地址栏，然后重新发起请求
   */
  useEffect(() => {
    if (params) setSearchParams({ q: JSON.stringify(params) });
    actions.list();
  }, [params]);

  useEffect(() => {
    search.formRef.current?.setFieldsValue(params?.s);
  }, []);

  return {
    modalRef,
    actions,
    statistic,
    styles,
    search,
    table,
    pagination,
    resData,
    setResData,
    params,
    setParams,
  };
};
