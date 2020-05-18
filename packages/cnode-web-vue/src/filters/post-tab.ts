import { TopicTabType } from "@mars/cnode-apis/types";

const tabMap = {
  "": "全部",
  ask: "问答",
  share: "分享",
  job: "招聘",
  good: "精华"
};

export default function(tab: TopicTabType) {
  return tabMap[tab] || "全部";
}
