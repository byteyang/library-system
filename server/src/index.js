require('dotenv').config()

const express = require('express')
const { expressjwt } = require('express-jwt')
const { router } = require('./router')

const app = express()

/** body-parser */
app.use(express.json())

/** jwt */
app.use(expressjwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
}).unless({ path: ['/api/login'] }))

/** 返回方法封装 */
app.use((_, resp, next) => {
  resp.succeed = (data = {}) => resp.json({ code: 0, data })
  resp.fail = (msg = '') => resp.json({ code: 500, msg })
  next()
})

/** 路由 */
app.use('/api', router)

app.listen(process.env.PORT)
