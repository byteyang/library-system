import { reactive } from 'vue'

export const store = reactive({
  username: '',
  role: 0,
  allBooks: [],
  myBooks: [],
})

export function clearStore() {
  store.username = ''
  store.role = 0
  store.allBooks = []
  store.myBooks = []
}
