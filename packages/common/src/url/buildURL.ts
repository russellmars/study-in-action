// import { queryString, StringifyOptions } from "query-string";
import { stringify, StringifyOptions } from "query-string";

// 构建URL
export default function buildURL(
  url: string,
  params?: object,
  options?: StringifyOptions
) {
  let targetUrl = url;

  if (params) {
    targetUrl +=
      (/\?/.test(url) ? "&" : "?") + stringify(params, options);
  }
  return targetUrl;
}
