<template>
  <div class="w-[250px] mx-auto">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="auto"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model.number="ruleForm.name" />
      </el-form-item>
      <el-form-item label="密 码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#3c33a6" round class="w-full mx-auto" @click="submitForm(ruleFormRef)">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import router from '@/router';
import pinia from '@/store'
import userStore from '@/store/user'
const useUserStore = userStore(pinia);

import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';

const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: '',
  pass: '',
})

const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{ validator: checkName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login();
    } else {
      ElMessage({
        type: 'error',
        message: '请完整填写信息!',
      })
      return false;
    }
  })
}

const login = () => {
  const userName = ruleForm.name;
  const userPassword = ruleForm.pass;
  const userData = { userName, userPassword };
  // TODO: 发起网络请求登录(userData)
  // if成功
  useUserStore.updateName(userName);
  ElMessage({
    type: 'success',
    message: '登录成功!',
  });
  router.push('/resume');
  // else
  // ElMessage({
  //   type: 'success',
  //   message: '用户名或密码错误!',
  // });
}
</script>