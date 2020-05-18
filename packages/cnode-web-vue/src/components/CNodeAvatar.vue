<template>
  <div v-lazy:background-image="src" class="cnode-avatar" :title="title"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop(String)
  readonly src!: string;

  @Prop({ default: "", type: String })
  readonly title!: string;
}
</script>
