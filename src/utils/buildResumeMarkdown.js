import {
  resumePersonalProjects,
  resumeProjects,
  resumeSkills,
} from '../data/resumeContent'

const PROJECT_ORDINALS = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

function getProjectOrdinal(index) {
  return `${PROJECT_ORDINALS[index]}、`
}

function formatProjectName(project, { inlineLink = false } = {}) {
  if (inlineLink && project.link) {
    return `${project.name}（${project.link}）`
  }
  return project.name
}

function projectToMarkdown(project, { includeDescription = true, inlineLink = false, ordinalPrefix = '' } = {}) {
  const lines = [
    `${ordinalPrefix}项目名称：${formatProjectName(project, { inlineLink })}`,
    '',
  ]

  if (project.link && !inlineLink) {
    lines.push(`项目链接：${project.link}`, '')
  }

  lines.push(`技术栈：${project.stack}`, '')

  if (includeDescription && project.description) {
    lines.push(`项目简述：${project.description}`, '')
  }

  lines.push('开发内容：', '')
  project.items.forEach((item, index) => {
    lines.push(`${index + 1}. ${item}`)
  })

  return lines.join('\n')
}

export function buildResumeMarkdown(resumeData) {
  const { profile, education, experience } = resumeData
  const lines = []

  lines.push('## 教育背景', '')
  education.forEach((item) => {
    lines.push(`**${item.degree}**　${item.period}`)
    lines.push(`${item.school} · ${item.major}`, '')
  })

  lines.push('## 专业技能', '')
  resumeSkills.forEach((item) => {
    lines.push(`- ${item}`)
  })
  lines.push('')

  lines.push('## 工作经验', '')
  experience.forEach((item) => {
    lines.push(`### ${item.company}　${item.period}`, '')
    lines.push(`岗位：${item.role}`, '')
    lines.push(`主要职责：${item.summary}`, '')
  })

  lines.push('## 项目经验', '')
  resumeProjects.forEach((project, index) => {
    lines.push(projectToMarkdown(project, { ordinalPrefix: getProjectOrdinal(index) }))
    if (index < resumeProjects.length - 1) lines.push('')
  })
  lines.push('')

  lines.push('## 个人项目', '')
  resumePersonalProjects.forEach((project, index) => {
    lines.push(projectToMarkdown(project, {
      includeDescription: false,
      inlineLink: true,
      ordinalPrefix: getProjectOrdinal(index),
    }))
    if (index < resumePersonalProjects.length - 1) lines.push('')
  })

  return lines.join('\n').trim()
}
