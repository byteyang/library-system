const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { pool } = require('./database')
const { md5 } = require('./utils')

const router = Router()

/**
 * 登录
 */
router.post('/login', async (req, resp) => {
  const { username, password } = req.body

  const [rows] = await pool.execute('SELECT * FROM ls_user WHERE username = ?', [username])
  if (!rows.length)
    return resp.fail('用户名或密码错误')

  const { password: userPassword, ...rest } = rows[0]
  if (userPassword !== md5(password))
    return resp.fail('用户名或密码错误')

  resp.succeed({ ...rest, token: jwt.sign(rest, process.env.SECRET, { algorithm: 'HS256' }) })
})

/**
 * 全部图书(管理员) / 可借图书(学生)
 */
router.post('/list-book', async (req, resp) => {
  const { role } = req.auth

  const sql = role === 1 ? 'SELECT * FROM ls_book' : 'SELECT * FROM ls_book WHERE borrower = 0'
  const [rows] = await pool.execute(sql)
  return resp.succeed(rows)
})

/**
 * 我的图书
 */
router.post('/list-my-book', async (req, resp) => {
  const { id } = req.auth

  const [rows] = await pool.execute('SELECT * FROM ls_book WHERE borrower = ?', [id])
  return resp.succeed(rows)
})

/**
 * 新增图书
 */
router.post('/add-book', async (req, resp) => {
  const { role } = req.auth
  if (role !== 1)
    return resp.sendStatus(401)

  const { name } = req.body
  try {
    const [rows] = await pool.execute('INSERT INTO ls_book(name) VALUES (?)', [name])
    resp.succeed(rows)
  }
  catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 修改图书
 */
router.post('/edit-book', async (req, resp) => {
  const { role } = req.auth
  if (role !== 1)
    return resp.sendStatus(401)

  const { id, name } = req.body
  try {
    const [rows] = await pool.execute('UPDATE ls_book SET name = ? WHERE id = ?', [name, id])
    resp.succeed(rows)
  }
  catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 删除图书
 */
router.post('/del-book', async (req, resp) => {
  const { role } = req.auth
  if (role !== 1)
    return resp.sendStatus(401)

  const { id } = req.body
  try {
    const [rows] = await pool.execute('DELETE FROM ls_book WHERE id = ?', [id])
    resp.succeed(rows)
  }
  catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 借书
 */
router.post('/borrow-book', async (req, resp) => {
  const { id: userId } = req.auth
  const { id: bookId } = req.body

  try {
    const [rows] = await pool.execute('UPDATE ls_book SET borrower = ? WHERE id = ?', [userId, bookId])
    resp.succeed(rows)
  }
  catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 还书
 */
router.post('/return-book', async (req, resp) => {
  const { id } = req.body

  try {
    const [rows] = await pool.execute('UPDATE ls_book SET borrower = 0 WHERE id = ?', [id])
    resp.succeed(rows)
  }
  catch (error) {
    resp.fail(error.message)
  }
})

exports.router = router
