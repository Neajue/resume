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
import pinia from '@/store'
import userStore from '@/store/user'
import { useRouter } from "vue-router";
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';
import { loginApi } from '@/utils/api/login';

const router = useRouter ();
const useUserStore = userStore(pinia);

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

const login = async () => {
  const accountName = ruleForm.name;
  const password = ruleForm.pass;
  const userData = { accountName, password };
  await loginApi(userData).then((res: any) => {
    console.log(res);
    if(res) {
      if(res.Code == 200) {
        // useUserStore.updateName(accountName);
        const userId = res.Data.userId;
        ElMessage({
          type: 'success',
          message: '登录成功!',
        });
        router.push('/resume');
      } else {
        ElMessage({
          type: 'error',
          message: res.Message,
        });
      }
    }
  });
}
</script>