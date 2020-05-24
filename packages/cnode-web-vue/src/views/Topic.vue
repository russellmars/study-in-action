<template>
  <div class="topic">
    <div class="container">
      <template v-if="topic">
        <div class="topic__main">
          <h3>{{ topic.title }}</h3>
          <div class="topic__overall">
            <span class="topic__overall-item">{{
              topic.create_at | fromNow
            }}</span>
            <span class="topic__overall-item">
              作者
              <router-link
                class="topic__author"
                :to="`/user/${topic.author.loginname}`"
                :title="topic.author.loginname"
                >{{ topic.author.loginname }}</router-link
              >
            </span>
            <span class="topic__overall-item"
              >{{ topic.visit_count }} 次浏览</span
            >
          </div>
          <div
            class="topic__content markdown-body"
            v-html="marked(topic.content)"
          ></div>
        </div>
        <div class="topic__replies">
          <c-node-section-header
            >{{ topic.replies.length }} 回复</c-node-section-header
          >
          <ul class="topic__replies-content">
            <li
              class="topic__reply"
              v-for="reply in topic.replies"
              :key="reply.id"
            >
              <div class="topic__reply-user">
                <router-link
                  class="topic__reply-username"
                  :to="`/user/${reply.author.loginname}`"
                >
                  {{ reply.author.loginname }}
                </router-link>
                <span class="topic__reply-date">{{
                  reply.create_at | fromNow
                }}</span>
                <span
                  v-if="reply.author.loginname === topic.author.loginname"
                  class="topic__reply-user-tag"
                  >作者</span
                >
              </div>
              <router-link
                :to="`/user/${topic.author.loginname}`"
                :title="topic.author.loginname"
                ><c-node-avatar
                  class="topic__reply-avatar"
                  :src="reply.author.avatar_url"
                  :title="topic.author.loginname"
              /></router-link>

              <div class="markdown-body" v-html="marked(reply.content)"></div>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getTopicDetail } from "@mars/cnode-apis";
import { TopicInfo, CnodeResponseBody } from "@mars/cnode-apis/types";
import CNodeAvatar from "@/components/CNodeAvatar.vue";
import CNodeSectionHeader from "@/components/CNodeSectionHeader.vue";
import marked from "marked";

@Component({
  components: {
    CNodeAvatar,
    CNodeSectionHeader
  }
})
export default class Topic extends Vue {
  @Prop()
  id!: string;

  topic: TopicInfo | null = null;

  created() {
    this.initPageData();
  }

  marked(markdown: string) {
    return marked(markdown);
  }

  async initPageData() {
    await this.fetchData();
  }

  async fetchData() {
    const { id } = this;
    const result: CnodeResponseBody = await getTopicDetail(id, {
      mdrender: false
    });
    if (result.success) {
      this.topic = result.data as TopicInfo;
    }
  }
}
</script>
