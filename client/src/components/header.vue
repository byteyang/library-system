<script setup>
import { ElDropdown, ElDropdownItem, ElDropdownMenu } from 'element-plus'
import { clearStore, store } from '../utils/store'

function logout() {
  localStorage.clear()
  clearStore()
}
</script>

<template>
  <div class="header">
    <div>
      <span class="title">图书管理系统</span>
    </div>
    <div v-if="!!store.username">
      <ElDropdown v-if="!!store.username">
        <span class="username">{{ store.username }}</span>
        <template #dropdown>
          <ElDropdownMenu>
            <ElDropdownItem @click="logout">
              注销
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style scoped>
.header {
  height: 32px;
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--el-color-primary-dark-2);

}

.title {
  font-size: var(--el-font-size-extra-large);
  font-weight: var(--el-font-weight-primary);
}

.username:hover {
  cursor: pointer;
}
</style>
