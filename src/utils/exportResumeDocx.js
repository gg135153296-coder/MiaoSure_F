import {
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  TextRun,
} from 'docx'
import {
  resumePersonalProjects,
  resumeProjects,
  resumeSkills,
} from '../data/resumeContent'

const FONT = 'Microsoft YaHei'
const BODY = 21
const TITLE = 32
const SUBTITLE = 22
const SECTION = 26
const LABEL_COLOR = '666666'
const PROJECT_ORDINALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

function getProjectOrdinal(index) {
  return `${PROJECT_ORDINALS[index]}、`
}

function text(content, opts = {}) {
  return new TextRun({
    text: content,
    font: FONT,
    size: BODY,
    ...opts,
  })
}

function paragraph(children, spacing = { after: 120 }) {
  return new Paragraph({
    spacing,
    children: children.length > 0 ? children : [text(' ')],
  })
}

function sectionTitle(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 160 },
    border: {
      bottom: {
        color: 'E8E8E8',
        size: 6,
        style: BorderStyle.SINGLE,
      },
    },
    children: [text(title, { size: SECTION, bold: true })],
  })
}

function labelLine(label, value, spacing = { after: 120 }) {
  return paragraph([
    text(label, { color: LABEL_COLOR }),
    text(value),
  ], spacing)
}

function addProjectBlocks(children, project, { includeDescription = true, inlineLink = false, ordinalPrefix = '' } = {}) {
  const name = inlineLink && project.link ? `${project.name}（${project.link}）` : project.name
  children.push(labelLine(`${ordinalPrefix}项目名称：`, name))
  if (project.link && !inlineLink) children.push(labelLine('项目链接：', project.link))
  children.push(labelLine('技术栈：', project.stack))
  if (includeDescription && project.description) children.push(labelLine('项目简述：', project.description))
  children.push(paragraph([text('开发内容：', { color: LABEL_COLOR })], { after: 80 }))
  project.items.forEach((item, index) => {
    children.push(paragraph([text(`${index + 1}. ${item}`)], { after: 80 }))
  })
  children.push(paragraph([text(' ')], { after: 240 }))
}

export async function buildResumeDocx(resumeData) {
  const { profile, education, experience } = resumeData
  const children = []

  children.push(
    paragraph([text(profile.name, { size: TITLE, bold: true })], { after: 80 }),
    paragraph([text(profile.title, { size: SUBTITLE, color: LABEL_COLOR })], { after: 200 }),
  )

  profile.contacts.forEach((item) => {
    children.push(labelLine(`${item.label}：`, item.value, { after: 80 }))
  })

  children.push(paragraph([text(' ')], { after: 200 }))

  children.push(sectionTitle('教育背景'))
  education.forEach((item) => {
    children.push(
      paragraph([
        text(item.degree, { bold: true }),
        text(`　${item.period}`, { color: LABEL_COLOR }),
      ], { after: 80 }),
      paragraph([text(`${item.school} · ${item.major}`, { color: LABEL_COLOR })], { after: 160 }),
    )
  })

  children.push(sectionTitle('专业技能'))
  resumeSkills.forEach((item) => {
    const plain = item.replace(/\*\*(.*?)\*\*/g, '$1')
    children.push(paragraph([text(`• ${plain}`)], { after: 100 }))
  })

  children.push(sectionTitle('工作经验'))
  experience.forEach((item) => {
    children.push(
      paragraph([
        text(item.company, { bold: true, size: SUBTITLE }),
        text(`　${item.period}`, { color: LABEL_COLOR }),
      ], { after: 80 }),
      paragraph([text('岗位：', { color: LABEL_COLOR }), text(item.role)], { after: 120 }),
      labelLine('主要职责：', item.summary, { after: 200 }),
    )
  })

  children.push(sectionTitle('项目经验'))
  resumeProjects.forEach((project, index) => addProjectBlocks(children, project, { ordinalPrefix: getProjectOrdinal(index) }))

  children.push(sectionTitle('个人项目'))
  resumePersonalProjects.forEach((project, index) => addProjectBlocks(children, project, {
    includeDescription: false,
    inlineLink: true,
    ordinalPrefix: getProjectOrdinal(index),
  }))

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              right: 720,
              bottom: 720,
              left: 720,
            },
          },
        },
        children,
      },
    ],
  })

  try {
    return await Packer.toBlob(doc)
  } catch {
    const buffer = await Packer.toArrayBuffer(doc)
    return new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    })
  }
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

export async function exportResumeDocxFile(resumeData) {
  const blob = await buildResumeDocx(resumeData)
  downloadBlob(blob, `${resumeData.profile.name}-简历.docx`)
}
