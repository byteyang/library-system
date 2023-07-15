import { post } from './utils/request'

/**
 * 登录
 * @param {*} username 用户名
 * @param {*} password 密码
 * @returns
 */
export async function login({ username, password }) {
  return post('/login', { username, password })
}

/**
 * 全部图书(管理员) / 可借图书(学生)
 * @returns
 */
export async function listBook() {
  return post('/list-book')
}

/**
 * 我的图书
 * @returns
 */
export async function listMyBook() {
  return post('/list-my-book')
}

/**
 * 新增图书
 * @param {*} name 图书名
 * @returns
 */
export async function addBook(name) {
  return post('/add-book', { name })
}

/**
 * 修改图书
 * @param {*} id 图书 ID
 * @param {*} name 图书名
 * @returns
 */
export async function editBook(id, name) {
  return post('/edit-book', { id, name })
}

/**
 * 删除图书
 * @param {*} id 图书 ID
 * @returns
 */
export async function delBook(id) {
  return post('/del-book', { id })
}

/**
 * 借书
 * @param {*} id 图书 ID
 * @returns
 */
export async function borrowBook(id) {
  return post('/borrow-book', { id })
}

/**
 * 还书
 * @param {*} id 图书 ID
 * @returns
 */
export async function returnBook(id) {
  return post('/return-book', { id })
}
