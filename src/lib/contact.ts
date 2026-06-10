import { contact } from '@/data/site'

export function whatsappHref(message = contact.whatsappPrefill) {
  const separator = contact.whatsappMessageLink.includes('?') ? '&' : '?'
  return `${contact.whatsappMessageLink}${separator}text=${encodeURIComponent(message)}`
}

export function buildAssessmentEmailHref(formData: FormData) {
  const name = String(formData.get('name') || '')
  const organization = String(formData.get('organization') || '')
  const subjectContext = organization || name || 'Facility'
  const body = [
    'Life-Oxi Technical Assessment Request',
    '',
    `Name: ${name}`,
    `Hospital/Organization: ${organization}`,
    `Location: ${formData.get('location') || ''}`,
    `Contact Number: ${formData.get('phone') || ''}`,
    `Email Address: ${formData.get('email') || ''}`,
    `Project Type: ${formData.get('projectType') || ''}`,
    '',
    'Project Description:',
    `${formData.get('projectDescription') || ''}`,
    '',
    'Additional Notes:',
    `${formData.get('notes') || 'None provided'}`,
  ].join('\n')

  return `mailto:${contact.email}?subject=${encodeURIComponent(`Technical Assessment Request - ${subjectContext}`)}&body=${encodeURIComponent(body)}`
}
