<template>
  <header class="cnode-section-header">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {}
</script>
