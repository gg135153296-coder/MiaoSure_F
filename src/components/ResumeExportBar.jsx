import { useCallback, useState } from 'react'
import { exportResumeMarkdown, exportResumePdf, exportResumeWord } from '../utils/exportResume'

export default function ResumeExportBar({ sheetRef, resumeData }) {
  const [exporting, setExporting] = useState(null)

  const runExport = useCallback(async (type, exporter) => {
    if (exporting) return

    setExporting(type)
    try {
      if (type === 'pdf') {
        const sheet = sheetRef.current
        if (!sheet) return
        await exportResumePdf(sheet, resumeData)
      } else if (type === 'word') {
        const sheet = sheetRef.current
        if (!sheet) return
        await exportResumeWord(sheet, resumeData)
      } else if (type === 'md') {
        exportResumeMarkdown(resumeData)
      }
    } catch (error) {
      console.error(`Resume ${type} export failed:`, error)
      window.alert('导出失败，请稍后重试')
    } finally {
      setExporting(null)
    }
  }, [exporting, resumeData, sheetRef])

  return (
    <div className="resume-export-bar" aria-label="简历导出">
      <button
        type="button"
        className="resume-export-bar__btn"
        disabled={Boolean(exporting)}
        onClick={() => runExport('md')}
      >
        {exporting === 'md' ? '导出中…' : '导出 MD'}
      </button>
      <button
        type="button"
        className="resume-export-bar__btn"
        disabled={Boolean(exporting)}
        onClick={() => runExport('word')}
      >
        {exporting === 'word' ? '导出中…' : '导出 Word'}
      </button>
      <button
        type="button"
        className="resume-export-bar__btn"
        disabled={Boolean(exporting)}
        onClick={() => runExport('pdf')}
      >
        {exporting === 'pdf' ? '导出中…' : '导出 PDF'}
      </button>
    </div>
  )
}
