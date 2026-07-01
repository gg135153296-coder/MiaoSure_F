export default function WritePage() {
  return (
    <div className="page-content">
      <section className="write-placeholder">
        <div className="write-placeholder__icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        </div>
        <h2 className="write-placeholder__title">记录你的想法</h2>
        <p className="write-placeholder__desc">
          写作功能即将上线，届时可以在这里记录技术笔记与生活随笔。
        </p>
        <div className="write-placeholder__tips">
          <p>✦ 支持 Markdown 编辑</p>
          <p>✦ 自动保存草稿</p>
          <p>✦ 一键发布文章</p>
        </div>
      </section>
    </div>
  )
}
