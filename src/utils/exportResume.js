import resumeCss from '../pages/ResumePage.css?inline'
import { buildResumeMarkdown } from './buildResumeMarkdown'
import { getDefaultResumeData } from './mergeResumeData'

function getFileName(resumeData) {
  return `${resumeData.profile.name}-简历`
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 2000)
}

function downloadText(content, filename, type = 'text/markdown;charset=utf-8') {
  downloadBlob(new Blob([content], { type }), filename)
}

function buildWordHtmlDocument(sheetEl, resumeData) {
  const clone = sheetEl.cloneNode(true)
  clone.querySelectorAll('img').forEach((img) => {
    const src = img.getAttribute('src') || img.src
    if (src) img.setAttribute('src', new URL(src, window.location.href).href)
  })

  return `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <title>${getFileName(resumeData)}</title>
  <!--[if gte mso 9]>
  <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
  <![endif]-->
  <style>
    ${resumeCss}
    body { margin: 0; padding: 24px; background: #fff; }
    .resume-page, .resume-page__main { height: auto !important; overflow: visible !important; padding: 0 !important; }
    .resume-sheet { max-width: 920px; margin: 0 auto; border: none !important; box-shadow: none !important; }
    .resume-export-bar { display: none !important; }
  </style>
</head>
<body>${clone.outerHTML}</body>
</html>`
}

export function exportResumeMarkdown(resumeData = getDefaultResumeData()) {
  const { profile } = resumeData
  const markdown = buildResumeMarkdown(resumeData)
  const header = [
    `# ${profile.name}`,
    '',
    profile.title,
    '',
    ...profile.contacts.map((item) => `${item.label}：${item.value}`),
    '',
  ].join('\n')

  downloadText(`${header}\n${markdown}`, `${getFileName(resumeData)}.md`)
}

export async function exportResumeWord(sheetEl, resumeData = getDefaultResumeData()) {
  try {
    const { exportResumeDocxFile } = await import('./exportResumeDocx')
    await exportResumeDocxFile(resumeData)
  } catch (error) {
    console.warn('DOCX export failed, fallback to Word HTML:', error)
    if (!sheetEl) throw error
    const html = buildWordHtmlDocument(sheetEl, resumeData)
    downloadBlob(
      new Blob(['\ufeff', html], { type: 'application/msword;charset=utf-8' }),
      `${getFileName(resumeData)}.doc`,
    )
  }
}

export async function exportResumePdf(sheetEl, resumeData = getDefaultResumeData()) {
  const { default: html2pdf } = await import('html2pdf.js')

  sheetEl.classList.add('resume-sheet--export')

  const container = document.createElement('div')
  container.style.cssText = 'position:fixed;left:-10000px;top:0;width:794px;background:#fff;z-index:-1;'

  const clone = sheetEl.cloneNode(true)
  clone.classList.add('resume-sheet--export')
  container.appendChild(clone)
  document.body.appendChild(container)

  try {
    await html2pdf()
      .set({
        margin: [12, 12, 12, 12],
        filename: `${getFileName(resumeData)}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          width: 794,
          windowWidth: 794,
        },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['css', 'legacy'], avoid: ['.resume-md h2'] },
      })
      .from(clone)
      .save()
  } finally {
    sheetEl.classList.remove('resume-sheet--export')
    document.body.removeChild(container)
  }
}
