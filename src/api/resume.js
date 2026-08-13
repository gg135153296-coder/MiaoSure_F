import { request } from './request'

/**
 * 获取简历动态字段（姓名、出生年月、电话、教育背景、工作公司及时段）
 * GET /api/resume/profile
 */
export function fetchResumeProfile() {
  return request('/resume/profile')
}

/**
 * 验证访问简历页的姓名
 * POST /api/resume/verify
 */
export function verifyResumeAccess(name) {
  return request('/resume/verify', {
    method: 'POST',
    body: { name },
  })
}
