import { createContext, useContext, useEffect, useState } from 'react'
import { fetchBlog } from '../api/blog'

const BlogContext = createContext(null)

export function BlogProvider({ children }) {
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBlog()
      .then(setBlog)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <BlogContext.Provider value={{ blog, loading, error }}>
      {children}
    </BlogContext.Provider>
  )
}

export function useBlog() {
  const context = useContext(BlogContext)
  if (!context) {
    throw new Error('useBlog must be used within BlogProvider')
  }
  return context
}
