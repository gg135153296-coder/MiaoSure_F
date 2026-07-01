import { request } from './request'

export function fetchProfileStats() {
  return request('/profile/stats')
}
