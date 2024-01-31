import { ParamsType } from "../typings";

/**
 * 从url中解析出params
 * @param searchParams
 * @param defaultParams
 * @returns
 */
export const fromSearchParamsToParams = (
  searchParams: string | null,
  defaultParams?: Record<string, any> | undefined
) => {
  if (searchParams !== null) {
    let json = JSON.parse(searchParams);
    return json;
  } else if (defaultParams !== null) {
    return defaultParams;
  } else {
    return null;
  }
};

export const getDataFromParams = (params: ParamsType) => {
  let d = { ...params?.s, ...params?.t, ...params?.p };
  return {
    data: d,
  };
};

export const getUrl = (baseUri: string, defaultUri: string, uri?: string) => {
  const url = uri === undefined ? defaultUri : uri;
  return baseUri + "/" + url;
};

//拼接路径
export const getImgUrl = (url?: string) => {
  if (!url) return "";
  var host = window.location.hostname;
  if (host.indexOf("www.") !== -1) {
    host = host.replace("www.", "upload.");
  } else {
    host = "https://upload.aic.com.co";
  }
  return host + url;
};

export const getParamsFromUrl = (
  query: string | undefined,
  defaultParams: Record<string, any> | undefined = undefined
) => {
  const q = query == "{}" || query == undefined ? undefined : JSON.parse(query);
  if (!q && !defaultParams) return undefined;
  else if (!q && defaultParams) return { search: defaultParams };
  else if (q && !defaultParams) return q;
  else return q;
};
