<template>
  <div>
    <nav>
      <div>
        <span>主题颜色</span>
        <el-color-picker v-model="themeColor"/>
      </div>
    </nav>
    <main>

    </main>
    <footer>

    </footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import pinia from '@/store'
import userStore from '@/store/user'
import resumeStore from '@/store/resume';

const useUserStore = userStore(pinia);
const useResumeStore = resumeStore(pinia);

let themeColor = ref("#3b5bdb");

watch(themeColor, (newValue) => {
  useResumeStore.updateThemeColor(newValue);
})

onMounted(() => {
  console.log(useUserStore.name);
})
</script>