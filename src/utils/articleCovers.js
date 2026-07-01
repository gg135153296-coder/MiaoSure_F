const coverMap = import.meta.glob('../content/articles/*.meta.js', {
  eager: true,
  import: 'default',
})

export function getArticleCover(id) {
  return coverMap[`../content/articles/${id}.meta.js`] ?? null
}
