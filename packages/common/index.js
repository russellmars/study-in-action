'use strict';

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.string.replace");

Object.defineProperty(exports, '__esModule', {
  value: true
});

var queryString = require('query-string');

function retina() {
  // 处理retina屏幕显示效果
  var classNames = [];
  var pixelRatio = window.devicePixelRatio || 1;
  classNames.push("pixel-ratio-" + Math.floor(pixelRatio));

  if (pixelRatio >= 2) {
    classNames.push("retina");
  }

  var html = document.getElementsByTagName("html")[0];
  classNames.forEach(function (className) {
    return html.classList.add(className);
  });
} // import { queryString, StringifyOptions } from "query-string";
// 构建URL


function buildURL(url, params, options) {
  var targetUrl = url;

  if (params) {
    targetUrl += (/\?/.test(url) ? "&" : "?") + queryString.stringify(params, options);
  }

  return targetUrl;
} // 合并两个URL


function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}

exports.buildURL = buildURL;
exports.combineURLs = combineURLs;
exports.retina = retina;
