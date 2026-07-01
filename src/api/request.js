const BASE_URL = import.meta.env.VITE_API_BASE || '/api'

/**
 * 统一请求封装
 * @param {string} path - 接口路径，如 '/posts'
 * @param {object} options
 * @param {string} [options.method='GET']
 * @param {object} [options.params] - query 参数
 * @param {object} [options.body] - JSON body
 */
export async function request(path, options = {}) {
  const { method = 'GET', params, body, headers = {} } = options

  let url = `${BASE_URL}${path}`

  if (params) {
    const search = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        search.append(key, String(value))
      }
    })
    const query = search.toString()
    if (query) url += `?${query}`
  }

  const response = await fetch(url, {
    method,
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  let json
  try {
    json = await response.json()
  } catch {
    throw new Error('服务器响应格式错误')
  }

  if (!response.ok || !json.success) {
    throw new Error(json.message || `请求失败 (${response.status})`)
  }

  return json.data
}
