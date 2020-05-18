<template>
  <div class="user">
    <div class="container">
      <template v-if="userInfo">
        <section class="user__section">
          <c-node-section-header>个人信息</c-node-section-header>
          <div class="user__section-content">
            <p>
              <c-node-avatar class="user__avatar" :src="userInfo.avatar_url" />
              <span class="user__loginname">{{ loginname }}</span>
            </p>
            <p class="user__score">{{ userInfo.score }} 积分</p>
            <p class="user__links" v-if="userInfo.githubUsername">
              github:
              <a
                class="user__link"
                :href="`http://github.com/${userInfo.githubUsername}`"
                target="_blank"
              >
                {{ userInfo.githubUsername }}
              </a>
            </p>
            <p class="user__date">
              注册时间 {{ userInfo.create_at | fromNow }}
            </p>
          </div>
        </section>

        <section class="user__section">
          <c-node-section-header>最近创建的话题</c-node-section-header>
          <div class="user__section-content">
            <c-node-simple-topic
              v-for="topic in userInfo.recent_topics"
              :key="topic.id"
              :topic="topic"
            />
            <span v-if="!userInfo.recent_topics.length">还没有收藏话题</span>
          </div>
        </section>

        <section class="user__section">
          <c-node-section-header>最近参与的话题</c-node-section-header>
          <div class="user__section-content">
            <c-node-simple-topic
              v-for="topic in userInfo.recent_replies"
              :key="topic.id"
              :topic="topic"
            />
          </div>
          <span v-if="!userInfo.recent_replies.length">还没有参与话题</span>
        </section>

        <section class="user__section">
          <c-node-section-header>收藏的话题</c-node-section-header>
          <div class="user__section-content">
            <c-node-simple-topic
              v-for="topic in collect_topics"
              :key="topic.id"
              :topic="topic"
            />
            <span v-if="!collect_topics.length">还没有收藏话题</span>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getUserInfo, getCollectTopics } from "@mars/cnode-apis";
import { CnodeResponseBody, UserInfo, Topic } from "@mars/cnode-apis/types";
import CNodeAvatar from "@/components/CNodeAvatar.vue";
import CNodeSectionHeader from "@/components/CNodeSectionHeader.vue";
import CNodeSimpleTopic from "@/components/CNodeSimpleTopic.vue";

@Component({
  components: {
    CNodeAvatar,
    CNodeSectionHeader,
    CNodeSimpleTopic
  }
})
export default class User extends Vue {
  @Prop()
  loginname!: string;

  userInfo: UserInfo | null = null;

  collect_topics: Topic[] = [];

  async created() {
    await Promise.all([this.fetchUserInfo(), this.fetchCollectTopics()]);
  }

  async fetchUserInfo() {
    const result: CnodeResponseBody = await getUserInfo(this.loginname);
    if (result.success) {
      this.userInfo = result.data as UserInfo;
    }
  }

  async fetchCollectTopics() {
    const result: CnodeResponseBody = await getCollectTopics(this.loginname);
    if (result.success) {
      this.collect_topics = result.data as Topic[];
    }
  }
}
</script>
