<template>
  <div class="w-screen h-screen flex flex-row items-center justify-center myBcakGround overflow-y-auto">
    <main class="flex flex-row flex-wrap justify-center">
      <el-card class="w-[350px] h-[400px]" shadow="hover">
        <h2 class="text-[2rem] font-bold my-[10px]" style="font-family: '幼圆';">简历</h2>
        <p class="mb-[5px]">💕这是一款免费的在线制作简历的产品，可以非常灵活的制作简历。</p>
        <p class="mb-[5px]">👉并且，你可以制作多份简历，它会保存你的基本信息，减少重复填写的次数。</p>
        <p class="mb-[5px]">👣你还可以创建自己的人生经历库，这样就可以根据岗位引入相关的经历。</p>
        <p class="mb-[5px]">👀接入了chatGPI 的 API，辅助你写出更好的简历。</p>
      </el-card>
      <el-card class="w-[350px] h-[400px]" v-if="isLogin" shadow="hover">
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <p>登录</p>
            <el-button class="button" text @click="updateLoginStatus(false)">注册</el-button>
          </div>
        </template>
        <loginForm></loginForm>
      </el-card>
      <el-card class="w-[350px] h-[400px]" v-else shadow="hover">
        <template #header>
          <div class="flex flex-row items-center justify-between">
            <p>注册</p>
            <el-button class="button" text @click="updateLoginStatus(true)">登录</el-button>
          </div>
        </template>
        <registerForm @register="updateLoginStatus(true)"></registerForm>
      </el-card>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import loginForm from '@/components/login-form.vue';
import registerForm from '@/components/register-form.vue';
import pinia from '@/store'
import userStore from '@/store/user'
const useUserStore = userStore(pinia);
let isLogin = ref(true);
const updateLoginStatus = (value: boolean) => {
  isLogin.value = value;
}
</script>

<style lang="scss" scoped>
.myBcakGround {
  background-image: url('@/assets/images/home_bg.jpeg');
  background-size: cover;   
}
.el-card {
  --el-card-border-radius: 0px;
  opacity: 0.8;
}
</style>