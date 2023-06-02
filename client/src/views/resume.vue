<template>
  <el-container class="w-screen h-screen overflow-hidden">
    <el-header class="bg-[#0b0e1a] h-[8vh]">
      <div>
        <span>主题颜色</span>
        <el-color-picker v-model="themeColor"/>
      </div>
    </el-header>
    <el-container>
      <el-aside width="w-[200px]">
        <el-scrollbar>
          <el-menu
          class="h-[92vh] w-[200px]"
          active-text-color="#e494b4"
          :background-color="bgColor"
          text-color="#fff"
          >
            <el-menu-item index="1">
              <el-icon><User /></el-icon>
              <template #title>基本信息</template>
            </el-menu-item>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><Reading /></el-icon>
                <span>教育经历</span>
              </template>
              <el-menu-item index="2-1">本科</el-menu-item>
              <el-menu-item index="2-2">研究生</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon><School /></el-icon>
                <span>校园经历</span>
              </template>
              <el-menu-item index="3-1">学生会</el-menu-item>
              <el-menu-item index="3-2">科研项目</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon><Wallet /></el-icon>
                <span>工作经历</span>
              </template>
              <el-menu-item index="4-1">阿里</el-menu-item>
              <el-menu-item index="4-2">腾讯</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="5">
              <template #title>
                <el-icon><Files /></el-icon>
                <span>项目经历</span>
              </template>
              <el-menu-item index="5-1">软件开发</el-menu-item>
              <el-menu-item index="5-2">深度学习</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="6">
              <template #title>
                <el-icon><TrophyBase /></el-icon>
                <span>荣誉奖项</span>
              </template>
              <el-menu-item index="6-1">互联网+</el-menu-item>
              <el-menu-item index="6-2">三好学生</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="7">
              <template #title>
                <el-icon><Memo /></el-icon>
                <span>资格证书</span>
              </template>
              <el-menu-item index="7-1">CET6</el-menu-item>
              <el-menu-item index="7-2">计算机等级</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="8">
              <template #title>
                <el-icon><Cpu /></el-icon>
                <span>专业技能</span>
              </template>
              <el-menu-item index="8-1">前端技能</el-menu-item>
              <el-menu-item index="8-2">后端技能</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="9">
              <template #title>
                <el-icon><ChatLineSquare /></el-icon>
                <span>自我评价</span>
              </template>
              <el-menu-item index="9-1">前端评价</el-menu-item>
              <el-menu-item index="9-2">后端评价</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="10">
              <template #title>
                <el-icon><More /></el-icon>
                <span>其他</span>
              </template>
              <el-menu-item index="10-1">one</el-menu-item>
              <el-menu-item index="10-2">two</el-menu-item>
            </el-sub-menu>
          </el-menu>
          <infoPop></infoPop>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-scrollbar class="w-full h-full">
          <el-main class="h-[82vh]">
            
          </el-main>
          <el-footer height="10vh">
            <p>支持我</p>
          </el-footer>
        </el-scrollbar>
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import pinia from '@/store'
import userStore from '@/store/user'
import resumeStore from '@/store/resume';
import { bgColor } from '@/utils/static';
import infoPop from '@/components/info-pop.vue';

const useUserStore = userStore(pinia);
const useResumeStore = resumeStore(pinia);

let themeColor = ref("#3b5bdb");

watch(themeColor, (newValue) => {
  useResumeStore.updateThemeColor(newValue);
})

onMounted(() => {
  console.log("userId", useUserStore.userId);
})
</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
 /* 美化滚动条 */
::-webkit-scrollbar {
  width: 7px;
  height: 2px;
}
::-webkit-scrollbar-track {
  width: 6px;
  background: rgba(23, 234, 217, 0.2);
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
::-webkit-scrollbar-thumb {
  background-color: rgba(96, 120, 234, 0.5);
  background-clip: padding-box;
  min-height: 28px;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
  transition: background-color .3s;
  cursor: pointer;
}
::-webkit-scrollbar-thumb:hover {
  background-color: rgba(96, 120, 234, 0.7);
}
.el-main {
  background-image: url('@/assets/images/home_bg.jpeg');
  background-size: cover;   
}
</style>