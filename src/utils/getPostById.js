import { posts } from '../data/posts'

export function getPostById(id) {
  return posts.find((post) => post.id === Number(id))
}
