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
        <el-input 
          v-model="ruleForm.pass" 
          type="password" 
          autocomplete="off" 
          show-password
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          show-password
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" color="#3c33a6" round class="w-full mx-auto" @click="submitForm(ruleFormRef)">注 册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus';

const emit = defineEmits(['register']);
const ruleFormRef = ref<FormInstance>()

const ruleForm = reactive({
  name: '',
  pass: '',
  checkPass: '',
})

const checkName = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  } else {
    callback()
  }
  // setTimeout(() => {
  //   // 使用接口判断用户名是否已经被使用
  //   callback(new Error('该用户名已存在！'))
  // }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("密码不一致！"))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  name: [{ validator: checkName, trigger: 'blur' }],
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      register();
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写信息!',
      })
      return false;
    }
  })
}

const register = () => {
  const userName = ruleForm.name;
  const userPassword = ruleForm.pass;
  const userData = { userName, userPassword };
  // TODO: 发起网络请求登录(userData)
  // if成功
  ElMessage({
    type: 'success',
    message: '注册成功!',
  });
  emit('register');
  // else
  // ElMessage({
  //   type: 'error',
  //   message: '注册失败!',
  // });
}
</script>