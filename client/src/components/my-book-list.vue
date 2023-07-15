<script setup>
import { onMounted, onUnmounted } from 'vue'
import { ElButton, ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { listBook, listMyBook, returnBook } from '../api'
import { store } from '../utils/store'

async function fetchData() {
  const [allBooks, myBooks] = await Promise.all([listBook(), listMyBook()])
  store.allBooks = allBooks
  store.myBooks = myBooks
}

async function ret(id) {
  await returnBook(id)
  fetchData()
}

onMounted(() => fetchData())
onUnmounted(() => store.myBooks = [])
</script>

<template>
  <div class="my-book-list">
    <div class="toolbar">
      <div class="title">
        我的图书
      </div>
    </div>
    <ElTable :data="store.myBooks" border stripe>
      <ElTableColumn prop="id" label="编号" width="180" />
      <ElTableColumn prop="name" label="书名" />
      <ElTableColumn label="操作" width="180">
        <template #default="scope">
          <ElButton type="primary" link @click="ret(scope.row.id)">
            还书
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div class="pagnation">
      <ElPagination background layout="prev, pager, next" :total="store.myBooks.length" :page-size="5" />
    </div>
  </div>
</template>

<style scoped>
.my-book-list {
  margin-top: 16px;
}
.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.title {
  font-size: var(--el-font-size-large);;
}

.pagnation {
  display: flex;
  flex-direction: row-reverse;
  margin-top: 16px;
}
</style>
