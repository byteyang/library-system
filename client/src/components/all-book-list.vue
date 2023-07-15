<script setup>
import { computed, onMounted, onUnmounted, reactive } from 'vue'
import { ElButton, ElDialog, ElForm, ElFormItem, ElInput, ElPagination, ElTable, ElTableColumn } from 'element-plus'
import { addBook, borrowBook, delBook, editBook, listBook, listMyBook } from '../api'
import { store } from '../utils/store'

const states = reactive({
  row: {},
  model: false,
})
const modelTitle = computed(() => states.row.id ? '编辑图书' : '新增图书')

async function fetchData() {
  const [allBooks, myBooks] = await Promise.all([listBook(), listMyBook()])
  store.allBooks = allBooks
  store.myBooks = myBooks
}

async function submit() {
  states.row.id
    ? await editBook(states.row.id, states.row.name)
    : await addBook(states.row.name)

  fetchData()
  states.model = false
}

async function remove(id) {
  await delBook(id)
  fetchData()
}

async function borrow(id) {
  await borrowBook(id)
  fetchData()
}

function openDialog(row) {
  states.row = row
  states.model = true
}

onMounted(() => fetchData())
onUnmounted(() => store.allBooks = [])
</script>

<template>
  <div class="all-book-list">
    <div class="toolbar">
      <div class="title">
        全部图书
      </div>
      <div v-if="store.role === 1">
        <ElButton type="primary" @click="openDialog({})">
          新增图书
        </ElButton>
      </div>
    </div>
    <ElTable :data="store.allBooks" border stripe>
      <ElTableColumn prop="id" label="编号" width="180" />
      <ElTableColumn prop="name" label="书名" />
      <ElTableColumn v-if="store.role === 1" label="状态" width="180">
        <template #default="scope">
          <span v-if="scope.row.borrower === 0">未借出</span>
          <span v-else>已借出</span>
        </template>
      </ElTableColumn>
      <ElTableColumn label="操作" width="180">
        <template #default="scope">
          <ElButton v-if="store.role === 1" type="primary" link @click="openDialog(scope.row)">
            编辑
          </ElButton>
          <ElButton v-if="store.role === 1" type="primary" link @click="remove(scope.row.id)">
            删除
          </ElButton>
          <ElButton v-else type="primary" link @click="borrow(scope.row.id)">
            借书
          </ElButton>
        </template>
      </ElTableColumn>
    </ElTable>
    <div class="pagnation">
      <ElPagination background layout="prev, pager, next" :total="store.allBooks.length" :page-size="5" />
    </div>
    <ElDialog v-model="states.model" :title="modelTitle">
      <ElForm :model="states.row">
        <ElFormItem label="书名">
          <ElInput v-model="states.row.name" />
        </ElFormItem>
      </ElForm>
      <template #footer>
        <span class="dialog-footer">
          <ElButton type="primary" @click="submit">
            保存
          </ElButton>
        </span>
      </template>
    </ElDialog>
  </div>
</template>

<style scoped>
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
