import { resumeExperience, resumeProfile } from '../data/resumeContent'

/** 接口不可用时的假数据（动态字段，不含真实信息） */
export const defaultResumeDynamic = {
  name: 'XXX',
  birthDate: 'XXXX年X月',
  phone: '13800000000',
  education: [
    {
      degree: 'XX学历',
      school: 'XX大学',
      major: 'XX专业',
      period: '20XX年X月毕业',
    },
  ],
  experience: resumeExperience.map(({ company, period }) => ({ company, period })),
}

function mergeExperienceList(apiList, fallbackList) {
  if (!Array.isArray(apiList) || apiList.length === 0) return fallbackList

  const maxLen = Math.max(apiList.length, fallbackList.length)
  return Array.from({ length: maxLen }, (_, index) => ({
    company: apiList[index]?.company ?? fallbackList[index]?.company ?? 'XX科技有限公司',
    period: apiList[index]?.period ?? fallbackList[index]?.period ?? '20XX.X - 至今',
  }))
}

function buildProfile(dynamic) {
  return {
    ...resumeProfile,
    name: dynamic.name,
    contacts: resumeProfile.contacts.map((item) => {
      if (item.label === '出生年月') {
        return { ...item, value: dynamic.birthDate }
      }
      if (item.label === '电话') {
        return { ...item, value: dynamic.phone, href: `tel:${dynamic.phone}` }
      }
      return item
    }),
  }
}

function buildExperience(dynamicExperience) {
  return resumeExperience.map((item, index) => ({
    ...item,
    company: dynamicExperience[index]?.company ?? item.company,
    period: dynamicExperience[index]?.period ?? item.period,
  }))
}

/**
 * 将接口数据与本地静态内容合并
 * @param {object|null|undefined} apiData
 */
export function mergeResumeData(apiData) {
  const dynamic = {
    name: apiData?.name ?? defaultResumeDynamic.name,
    birthDate: apiData?.birthDate ?? defaultResumeDynamic.birthDate,
    phone: apiData?.phone ?? defaultResumeDynamic.phone,
    education:
      Array.isArray(apiData?.education) && apiData.education.length > 0
        ? apiData.education
        : defaultResumeDynamic.education,
    experience: mergeExperienceList(apiData?.experience, defaultResumeDynamic.experience),
  }

  return {
    profile: buildProfile(dynamic),
    education: dynamic.education.map((item) => ({ ...item })),
    experience: buildExperience(dynamic.experience),
  }
}

export function getDefaultResumeData() {
  return mergeResumeData(null)
}
