import { ElMessage } from 'element-plus'
import { TOKEN_KEY } from './constants'

const baseUrl = '/api'

function getToken() {
  return `Bearer ${localStorage.getItem(TOKEN_KEY)}`
}

export async function post(path, req = {}) {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getToken(),
    },
    body: JSON.stringify(req),
  }
  const response = await fetch(`${baseUrl}${path}`, options)

  // 鉴权失败
  if (response.status === 401) {
    ElMessage.error('没有权限')
    throw new Error(response.statusText)
  }

  // 接口调用错误
  if (response.status !== 200) {
    ElMessage.error('服务错误')
    throw new Error(response.statusText)
  }

  // 业务逻辑错误
  const { code, msg, data } = await response.json()
  if (code !== 0) {
    ElMessage.error(msg)
    throw new Error(msg)
  }

  return data
}
