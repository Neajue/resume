<template>
  <el-drawer 
    v-model="showDrawer"
    direction="ltr"
    :before-close="handleClose"
    :show-close="false"
    :modal="false"
  >
    <template #header>
      <h4>{{ infoType[typeCode] }}</h4>
    </template>
    <template #default>
      <div>
        <!-- 基本信息 -->
        <el-form
          v-if="typeCode==1001"
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="default"
          status-icon
        >
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" class="w-full">
              <el-option label="男" value="男" />
              <el-option label="女" value="女" />
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birthDay">
            <el-date-picker
              v-model="ruleForm.birthDay"
              type="date"
              class="w-full"
            />
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="ruleForm.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email" />
          </el-form-item>
          <el-form-item label="籍贯" prop="nativePlace">
            <el-select-v2
              class="w-full"
              v-model="ruleForm.nativePlace"
              :options="provinceOptions"
            />
          </el-form-item>
          <el-form-item label="政治面貌" prop="politicalStatus">
            <el-select-v2
              class="w-full"
              v-model="ruleForm.politicalStatus"
              :options="politicalStatusOptions"
            />
          </el-form-item>
          <el-form-item label="最高学历" prop="politicalStatus">
            <el-select-v2
              class="w-full"
              v-model="ruleForm.highestEdu"
              :options="eduLevelOptions"
            />
          </el-form-item>
        </el-form>
        <!-- 求职信息 -->
        <el-form
          v-else-if="typeCode==1002"
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="default"
          status-icon
        >
        <el-form-item label="意向岗位" prop="position">
          <el-input v-model="ruleForm.position" />
        </el-form-item>
        <el-form-item label="意向城市" prop="city">
          <el-select-v2
            class="w-full"
            v-model="ruleForm.city"
            placeholder="请选择至多3个意向城市"
            :options="provinceOptions"
            multiple
            clearable
            :multiple-limit='3'
          />
        </el-form-item>
        <el-form-item label="求职状态" prop="status">
          <el-select-v2
            class="w-full"
            v-model="ruleForm.status"
            :options="jobStatusOptions"
          />
        </el-form-item>
        <el-form-item label="" prop="isDefault" class="flex flex-row justify-end">
          <el-checkbox v-model="ruleForm.isDefault">默认</el-checkbox>
        </el-form-item>
        </el-form>
        <!-- 教育经历 -->
        <el-form
          v-else-if="typeCode==1003"
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="default"
          status-icon
        >
          <el-form-item label="学校" prop="school">
            <el-input v-model="ruleForm.school" />
          </el-form-item>
          <el-form-item label="学历" prop="level">
            <el-select-v2
              v-model="ruleForm.level"
              :options="eduLevelOptions"
            />
          </el-form-item>
          <el-form-item label="学院" prop="academy">
            <el-input v-model="ruleForm.academy" />
          </el-form-item>
          <el-form-item label="主修专业" prop="major">
            <el-input v-model="ruleForm.major" />
          </el-form-item>
          <el-form-item label="时间" prop="timeRange">
            <el-date-picker
              v-model="ruleForm.timeRange"
              type="daterange"
              start-placeholder="入学时间"
              end-placeholder="毕业时间"
            />
          </el-form-item>
          <el-form-item label="当前绩点" prop="currentGpa">
            <el-input v-model="ruleForm.currentGpa" type="number" step="0.01" />
          </el-form-item>
          <el-form-item label="满绩" prop="fullGpa">
            <el-input v-model="ruleForm.fullGpa" type="number" step="0.1" />
          </el-form-item>
          <el-form-item label="排名" prop="rank">
            <el-input v-model="ruleForm.rank" />
          </el-form-item>
          <el-form-item label="课程" prop="course">
            <el-input v-model="ruleForm.course" type="textarea" autosize resize="none" />
          </el-form-item>
        </el-form>
        <!-- 校园、工作、项目经历 -->
        <el-form
          v-else-if="typeCode==1010 || typeCode==1011 || typeCode==1012"
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="default"
          status-icon
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="ruleForm.position" />
          </el-form-item>
          <el-form-item label="时间" prop="timeRange">
            <el-date-picker
              v-model="ruleForm.timeRange"
              type="daterange"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" autosize resize="none" />
          </el-form-item>
        </el-form>
        <!-- 奖状、证书 -->
        <el-form
          v-else-if="typeCode==1020 || typeCode==1021"
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="default"
          status-icon
        >
          <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="等级" prop="politicalStatus">
            <el-select-v2
              v-model="ruleForm.level"
              :options="CertificateLevelOptions"
            />
          </el-form-item>
          <el-form-item label="时间" prop="birthDay">
            <el-date-picker
              v-model="ruleForm.time"
              type="date"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description" type="textarea" autosize resize="none" />
          </el-form-item>
        </el-form>
        <!-- 其他（纯文本） -->
        <el-form
          v-else
          :model="ruleForm"
          :rules="rules"
          label-width="90px"
          size="default"
          status-icon
        >
          <el-form-item label="内容" prop="content">
            <el-input v-model="ruleForm.content" type="textarea" autosize resize="none" />
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelForm">取消</el-button>
        <el-button type="primary" :loading="loading" @click="submitForm()">
          {{ loading ? '保存中 ...' : '保存' }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { infoType, provinceOptions, eduLevelOptions, politicalStatusOptions, jobStatusOptions, CertificateLevelOptions } from '@/utils/static'
import { form } from '@/utils/form';

const props = defineProps({
  typeCode: {
    type: Number,
    default: 1010,
  },
})

let showDrawer = ref(true);
// const ruleFormRef = ref<FormInstance>() // TODO:暂时不进行表单验证
const ruleForm = reactive(form[props.typeCode].ruleForm);
const rules = reactive<FormRules>(form[props.typeCode].rules);

const loading = ref(false);
let timer : any;

const handleClose = (done: Function) => {
  if (loading.value) {
    return;
  }
  ElMessageBox.confirm('是否提交信息?')
    .then(() => {
      loading.value = true;
      timer = setTimeout(() => {
        done(); //关闭抽屉
        setTimeout(() => {
          loading.value = false;
        }, 400)
      }, 2000)
    }).catch(() => {
      // catch error
    })
}

const cancelForm = () => {
  loading.value = false;
  showDrawer.value = false;
  clearTimeout(timer);
}

const submitForm = () => {
  save();
  showDrawer.value = false;
}

const save = async () => {
  // await 发起网络请求。
  console.log(ruleForm);
}
</script>
<style lang="scss" scoped>

</style>