<template>
  <div class="bottom" v-if="frontmatter.layout === 'home'">
    <a href="https://beian.miit.gov.cn/#/Integrated/index">冀ICP备2023018576号-1 &nbsp;</a>
    <img style="display: inline-block" src="https://www.hebtu.edu.cn/resources/40/20170303094702805.png" /><img />
    <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=13013302000081"> 冀公网安备 13013302000081号</a>
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
const { page, frontmatter } = useData()
</script>

<style scoped>
.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
