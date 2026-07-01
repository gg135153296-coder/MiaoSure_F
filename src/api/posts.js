import { request } from './request'

export function fetchPosts(params = {}) {
  return request('/posts', { params })
}

export function fetchFeaturedPosts() {
  return request('/posts/featured')
}

export function fetchHotPosts(limit = 3) {
  return request('/posts/hot', { params: { limit } })
}

export function searchPosts(q) {
  return request('/posts/search', { params: { q } })
}

export function fetchPost(id) {
  return request(`/posts/${id}`)
}

export function fetchPostContent(id) {
  return request(`/posts/${id}/content`)
}

export function createPost(data) {
  return request('/posts', { method: 'POST', body: data })
}
