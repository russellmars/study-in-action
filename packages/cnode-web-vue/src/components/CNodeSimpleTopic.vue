<template>
  <div class="cnode-simple-topic">
    <router-link :to="`/user/${topic.author.loginname}`">
      <c-node-avatar
        class="cnode-simple-topic__avatar"
        :src="topic.author.avatar_url"
      />
    </router-link>
    <router-link
      class="cnode-simple-topic__title"
      :to="{ path: `/topic/${topic.id}` }"
      :title="topic.title"
      >{{ topic.title }}</router-link
    >
    <div class="cnode-simple-topic__date">
      {{ topic.last_reply_at | fromNow }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import CNodeAvatar from "@/components/CNodeAvatar.vue";
import { Topic } from "@mars/cnode-apis/types";

@Component({
  components: {
    CNodeAvatar
  }
})
export default class HelloWorld extends Vue {
  @Prop() readonly topic!: Topic;
}
</script>
