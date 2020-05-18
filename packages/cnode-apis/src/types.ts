export type TopicTabType = "" | "ask" | "share" | "job" | "good";

export interface TopicsParams {
  page?: number;
  tab?: TopicTabType;
  limit?: number;
  mdrender?: boolean;
}

export interface TopicDetailParams {
  accesstoken?: string;
  mdrender?: boolean;
}

export interface CnodeResponseBody {
  success: boolean;
  data: any;
  [propName: string]: any;
}

export interface Topic {
  id: string;
  last_reply_at: string;
  title: string;
  author: Author;
}

export interface TopicInfo extends Topic {
  author_id: string;
  tab: string;
  content: string;
  good: boolean;
  top: boolean;
  reply_count: number;
  visit_count: number;
  create_at: string;
  replies?: Reply[];
}

export interface Author {
  loginname: string;
  avatar_url: string;
}

export interface Reply {
  id: string;
  author: Author;
  content: string;
  create_at: string;
  is_uped: boolean;
  reply_id: string | null;
}

export interface UserInfo {
  avatar_url: string;
  create_at: string;
  githubUsername: string;
  loginname: string;
  recent_replies: Topic[];
  recent_topics: Topic[];
  score: number;
}