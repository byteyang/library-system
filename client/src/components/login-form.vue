<script setup>
import { ElButton, ElForm, ElFormItem, ElInput } from 'element-plus'
import { reactive, ref } from 'vue'
import { login } from '../api'
import { TOKEN_KEY } from '../utils/constants'
import { store } from '../utils/store'

const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
}

const form = ref()
const states = reactive({
  loading: false,
  model: { username: '', password: '' },
})

async function submit() {
  const isValid = await form.value?.validate()
  if (!isValid)
    return

  const { username, role, token } = await login(states.model)

  localStorage.setItem(TOKEN_KEY, token)
  store.username = username
  store.role = role
}
</script>

<template>
  <div class="login-form">
    <ElForm
      ref="form"
      :model="states.model"
      :rules="rules"
      class="form"
      label-width="100px"
    >
      <ElFormItem label="用户名:" prop="username">
        <ElInput v-model="states.model.username" :disabled="states.loading" />
      </ElFormItem>
      <ElFormItem label="密码:" prop="password">
        <ElInput
          v-model="states.model.password"
          :disabled="states.loading"
          type="password"
          show-password
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" :loading="states.loading" @click="submit">
          登录
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style scoped lang="scss">
.login-form {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  width: 400px;
}
</style>
