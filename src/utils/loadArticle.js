const articleModules = import.meta.glob('../content/articles/*.js')

export async function loadArticleContent(id) {
  const key = `../content/articles/${id}.js`
  const loader = articleModules[key]
  if (!loader) return null

  const module = await loader()
  return module.default
}
