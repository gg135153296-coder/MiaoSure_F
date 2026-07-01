import { request } from './request'

export function fetchBlog() {
  return request('/blog')
}

export function fetchHotTags() {
  return request('/blog/tags/hot')
}
