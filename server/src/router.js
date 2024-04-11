const { Router } = require('express')
const jwt = require('jsonwebtoken')
const { db } = require('./database')
const { md5 } = require('./utils')

const router = Router()

/**
 * 登录
 */
router.post('/login', async (req, resp) => {
  const { username, password } = req.body

  const user = await db('ls_user').where('username', username).first()
  if (!user) {
    return resp.fail('用户名或密码错误')
  }

  const { password: userPassword, ...rest } = user
  if (userPassword !== md5(password)) {
    return resp.fail('用户名或密码错误')
  }

  resp.succeed({
    ...rest,
    token: jwt.sign(rest, process.env.SECRET, { algorithm: 'HS256' }),
  })
})

/**
 * 全部图书(管理员) / 可借图书(学生)
 */
router.post('/list-book', async (req, resp) => {
  const { role } = req.auth

  const rows =
    role === 1 ? await db('ls_book') : await db('ls_book').where('borrower', 0)
  return resp.succeed(rows)
})

/**
 * 我的图书
 */
router.post('/list-my-book', async (req, resp) => {
  const { id } = req.auth

  const rows = await db('ls_book').where('borrower', id)
  return resp.succeed(rows)
})

/**
 * 新增图书
 */
router.post('/add-book', async (req, resp) => {
  const { role } = req.auth
  if (role !== 1) {
    return resp.sendStatus(401)
  }

  const { name } = req.body
  try {
    const result = await db('ls_book').insert({ name })
    resp.succeed(result)
  } catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 修改图书
 */
router.post('/edit-book', async (req, resp) => {
  const { role } = req.auth
  if (role !== 1) {
    return resp.sendStatus(401)
  }

  const { id, name } = req.body
  try {
    const result = await db('ls_book').where('id', id).update({ name })
    resp.succeed(result)
  } catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 删除图书
 */
router.post('/del-book', async (req, resp) => {
  const { role } = req.auth
  if (role !== 1) {
    return resp.sendStatus(401)
  }

  const { id } = req.body
  try {
    const result = await db('ls_book').where('id', id).del()
    resp.succeed(result)
  } catch (error) {
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
    const result = await db('ls_book')
      .where('id', bookId)
      .update({ borrower: userId })
    resp.succeed(result)
  } catch (error) {
    resp.fail(error.message)
  }
})

/**
 * 还书
 */
router.post('/return-book', async (req, resp) => {
  const { id } = req.body

  try {
    const result = await db('ls_book').where('id', id).update({ borrower: 0 })
    resp.succeed(result)
  } catch (error) {
    resp.fail(error.message)
  }
})

exports.router = router
