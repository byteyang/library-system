const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './db.sqlite3',
  },
  useNullAsDefault: true,
})

async function migrate() {
  // 创建 ls_user 表
  await knex.schema.createTable('ls_user', (table) => {
    table.increments('id').primary().comment('ID')
    table.string('username', 20).notNullable().defaultTo('').comment('用户名')
    table.string('password', 32).notNullable().defaultTo('').comment('密码')
    table
      .integer('role')
      .notNullable()
      .defaultTo(0)
      .comment('角色 1=管理员 | 2=学生')
  })

  // 插入数据到 ls_user 表
  await knex('ls_user').insert([
    {
      id: 1,
      username: 'admin',
      password: '21232f297a57a5a743894a0e4a801fc3',
      role: 1,
    },
    {
      id: 2,
      username: 'student',
      password: 'cd73502828457d15655bbd7a63fb0bc8',
      role: 2,
    },
  ])

  // 创建 ls_book 表
  await knex.schema.createTable('ls_book', (table) => {
    table.increments('id').primary().comment('ID')
    table.string('name', 20).notNullable().defaultTo('').comment('图书名')
    table
      .integer('borrower')
      .notNullable()
      .defaultTo(0)
      .comment('借书人用户ID 0=未借出')
  })
}

// 执行迁移
migrate()
  .then(() => {
    console.log('Migration successful')
    process.exit(0)
  })
  .catch((error) => {
    console.error('Error during migration:', error)
    process.exit(1)
  })
