import { combineURLs, buildURL } from "@mars/common";
import { CnodeResponseBody, TopicsParams, TopicDetailParams } from "./types";

export const controllers: AbortController[] = [];

const BASE_API = "https://cnodejs.org/api/v1";

/**
 * cnode api调用的基础方法
 * @param url cnode api 方法全路径，包括query参数
 * @param options api的其他参数，包括headers等的设置
 */
async function request(
  url: string,
  options?: RequestInit
): Promise<CnodeResponseBody | any> {
  const controller = new AbortController();

  controllers.push(controller);

  try {
    const response = await fetch(combineURLs(BASE_API, url), {
      ...options,
      signal: controller.signal
    });
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(response);
  } catch (error) {
    return Promise.reject(error);
  } finally {
    if (controllers && controllers.length > 0) {
      const index = controllers.indexOf(controller);
      if (index > -1) {
        controllers.splice(index, 1);
      }
    }
  }
}

/**
 * cnode api 的get方法调用
 * @param url cnode api 方法路径
 * @param params query参数
 * @param options api的其他参数，包括headers等的设置
 */
function get(url: string, params?: object, options?: RequestInit) {
  return request(buildURL(url, params), options);
}

/**
 * cnode api 的post方法调用
 * @param url cnode api 方法路径
 * @param data body参数
 * @param params query参数
 * @param options api的其他参数，包括headers等的设置
 */
function post(
  url: string,
  data?: object,
  params?: object,
  options?: RequestInit
) {
  return request(buildURL(url, params), {
    ...options,
    body: JSON.stringify(data || {}),
    headers: {
      "Content-Type": "application/json"
    }
  });
}

/**
 * 获取topics列表
 * @param params 查询参数
 */
export function getTopics(params: TopicsParams) {
  return get("/topics", params);
}

/**
 * 获取topic详情
 * @param topicId topicId
 * @param params 参选参数
 */
export function getTopicDetail(topicId: string, params: TopicDetailParams) {
  return get(`/topic/${topicId}`, params);
}

/**
 * 收藏topic
 * @param topicId topicId
 */
export function collectTopic(topicId: string) {
  return post("/topic_collect/collect", {
    topic_id: topicId
  });
}

/**
 * 取消收藏topic
 * @param topicId topicId
 */
export function cancelCollectTopic(topicId: string) {
  return post("/topic_collect/collect", {
    topic_id: topicId
  });
}

/**
 * 获取某用户的收藏topics
 * @param loginname 用户登录名
 */
export function getCollectTopics(loginname: string) {
  return get(`/topic_collect/${loginname}`);
}

/**
 * 获取某用户的信息
 * @param loginname 用户登录名
 */
export function getUserInfo(loginname: string) {
  return get(`/user/${loginname}`);
}

/**
 * 检查登录accesstoken是否有效
 * @param accesstoken accesstoken
 */
export function checkLogin(accesstoken: string) {
  return post("/accesstoken", {
    accesstoken
  });
}

/**
 * 获取未读消息的数量
 * @param accesstoken accesstoken
 */
export function getUnreadMessageCount(accesstoken: string) {
  return get("/message/count", {
    accesstoken
  });
}

/**
 * 获取所有消息
 * @param accesstoken accesstoken
 * @param mdrender 是否渲染md
 */
export function getMessages(accesstoken: string, mdrender: boolean) {
  return get("/messages", {
    accesstoken,
    mdrender
  });
}

/**
 * 使全部消息已读
 * @param accesstoken accesstoken
 */
export function markReadAllMessage(accesstoken: string) {
  return post("/message/mark_all", {
    accesstoken
  });
}

/**
 * 使某个消息已读
 * @param messageId 消息id
 * @param accesstoken accesstoken
 */
export function markReadMessage(messageId: string, accesstoken: string) {
  return post(`/message/mark_one/${messageId}`, {
    accesstoken
  });
}
