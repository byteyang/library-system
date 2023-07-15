<script setup>
import Header from './components/header.vue'
import LoginForm from './components/login-form.vue'
import AllBookList from './components/all-book-list.vue'
import MyBookList from './components/my-book-list.vue'
import { store } from './utils/store'
</script>

<template>
  <Header />
  <div class="main">
    <!-- 管理员 -->
    <template v-if="store.role === 1">
      <AllBookList />
    </template>

    <!-- 学生 -->
    <template v-else-if="store.role === 2">
      <AllBookList />
      <MyBookList />
    </template>

    <!-- 登录 -->
    <template v-else>
      <LoginForm />
    </template>
  </div>
</template>

<style scoped>
.main {
  flex: 1;
  padding: 16px;
}
</style>
