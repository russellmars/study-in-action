<template>
  <div class="home">
    <div class="home__tabs">
      <div class="container">
        <ul class="home__tabs-wrapper">
          <li
            class="home__tab"
            :class="{ 'home__tab--active': t === tab }"
            v-for="t in tabs"
            :key="t"
          >
            <router-link
              class="home__tab-link"
              :to="{ path: '/', query: { tab: t } }"
            >
              {{ t | postTab }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="container">
      <div class="home__main" v-if="topics.length">
        <ul class="home__posts">
          <li class="home__post" v-for="topic in topics" :key="topic.id">
            <div class="home__post-left">
              <!-- <div
                class="home__post-avatar"
                :style="{ backgroundImage: `url(${topic.author.avatar_url})` }"
                :title="topic.author.loginname"
              ></div> -->
              <router-link :to="{ path: `/user/${topic.author.loginname}` }">
                <c-node-avatar
                  class="home__post-avatar"
                  :src="topic.author.avatar_url"
                  :title="topic.author.loginname"
                />
              </router-link>
              <span class="home__post-count">
                <span>{{ topic.reply_count }}</span>
                <span>/</span>
                <span>{{ topic.visit_count }}</span>
              </span>
              <span class="home__post-tab">{{ topic.tab | postTab }}</span>
              <router-link
                class="home__post-title"
                :to="{ path: `/topic/${topic.id}` }"
              >
                {{ topic.title }}
              </router-link>
            </div>
            <div class="home__post-right">
              {{ topic.last_reply_at | fromNow }}
            </div>
          </li>
        </ul>
        <div class="home__pagination">
          <div class="home__pagination-prev" v-show="page > 1">
            <router-link
              class="home__pagination-link"
              :to="{ path: '/', query: { tab, page: page - 1 } }"
            >
              上一页
            </router-link>
          </div>
          <div class="home__pagination-next">
            <router-link
              class="home__pagination-link"
              :to="{ path: '/', query: { tab, page: page + 1 } }"
            >
              下一页
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { getTopics } from "@mars/cnode-apis";
import {
  CnodeResponseBody,
  TopicInfo,
  TopicTabType
} from "@mars/cnode-apis/types";
import { Route, NavigationGuard } from "vue-router/types/router";
import CNodeAvatar from "@/components/CNodeAvatar.vue";
// class-component-hooks.js
// Register the router hooks with their names

@Component({
  components: {
    CNodeAvatar
  }
})
export default class Home extends Vue {
  topics: TopicInfo[] = [];
  page: number = 1;
  tab: TopicTabType = "";
  tabs: TopicTabType[] = ["", "good", "share", "ask", "job"];

  async created() {
    await this.initPageData(this.$route);
  }

  @Watch("$route")
  async onRouteChange(to: Route) {
    await this.initPageData(to);
  }

  async initPageData(route: Route) {
    await this.resolveQueryByRoute(route);
    await this.fetchData();
  }

  async resolveQueryByRoute(route: Route) {
    const { query } = this.$route;
    const tab = query.tab as TopicTabType;
    const page = parseInt(query.page as string) || 1;
    this.tab = this.tabs.includes(tab) ? tab : "";
    this.page = page;
  }

  async fetchData() {
    try {
      const { tab, page } = this;
      const result: CnodeResponseBody = await getTopics({
        tab,
        page,
        limit: 20,
        mdrender: false
      });
      if (result.success) {
        this.topics = result.data as TopicInfo[];
      }
    } catch (error) {
      console.log(error);
    }
  }
}
</script>
